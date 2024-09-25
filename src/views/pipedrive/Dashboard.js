import { html, LitElement, css } from 'lit';
import { sharedStyles } from '/src/styles/shared-styles'; // Assuming you have shared styles
import { ViewBase } from '../ViewBase';

class Dashboard extends ViewBase {

  static properties = {
    columns: { type: Object },
    draggedCard: { type: Object },
    dragOverElement: { type: Object }
  };

  static styles = [
    sharedStyles,
    css`
      .dashboard {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        background-color: #f5f5f5;
      }

      .column {
        width: 14%;
        background-color: white;
        border-radius: 5px;
        padding: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        min-height: 400px;
        margin: 5px;
        padding-bottom: 50px;
      }

      .card {
        height: 100px;
        background-color: #ffffff;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 5px;
        margin-bottom: 10px;
        cursor: move;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        z-index: 1;
      }

      .card.dragging {
        opacity: 0.8;
        z-index: 10;
      }

      .card-header {
        font-weight: bold;
        margin-bottom: 5px;
        font-size: 15px;
        text-align: center;
      }

      .card-subtext {
        font-size: 13px;
        margin-bottom: 8px;
        color: #888;
        text-align: center;
      }

      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 15px;
        text-align: center;
      }

      .card-footer img {
        width: 16px;
        height: 16px;
      }

      .card-footer .amount {
        font-weight: bold;
      }

      .warning-icon {
        width: 16px;
        height: 16px;
        margin-left: 5px;
      }
    `
  ];

  constructor() {
    super();
    this.columns = {
      firstMeeting: [{ id: 1, text: 'Adrian Coutinho deal', type: 'Retail, Adrian Coutinho', amount: 'ZAR2,000,000' }, /* other cards */],
      secondMeeting: [{ id: 2, text: 'Global Sinking Fund', type: 'Investment, Global Fund', amount: 'ZAR10,000,000' }, /* other cards */],
      deciding: [{ id: 3, text: 'Kerry Lennon deal', type: 'Retail, Kerry Lennon', amount: 'ZAR5,000,000' }, /* other cards */],
      accepted: [{ id: 4, text: 'Dube Preservation', type: 'Preservation, Dube', amount: 'ZAR3,500,000' }, /* other cards */],
      businessSubmitted: [{ id: 5, text: 'Isabell Rühle deal', type: 'Retail, Isabell Rühle', amount: 'ZAR1,500,000' }, /* other cards */],
      awaitingPayment: [{ id: 6, text: 'CFW deal', type: 'Corporate, CFW', amount: 'ZAR6,000,000' }, /* other cards */],
      finalized: [{ id: 7, text: 'Neethal Natha deal', type: 'Retail, Neethal Natha', amount: 'ZAR4,000,000' }, /* other cards */],
    };

    this.draggedCard = null;  // Store the card being dragged
    this.dragOverElement = null; // Track the element currently being dragged over
  }

  firstUpdated() {
    super.firstUpdated();
    this.addEventListeners();
  }

  updated() {
    this.addEventListeners(); // Re-attach event listeners after every render
  }

  addEventListeners() {
    this.shadowRoot.querySelectorAll('.card').forEach(card => {
      // Desktop drag events
      card.addEventListener('dragstart', this.handleDragStart.bind(this));
      card.addEventListener('dragend', this.handleDragEnd.bind(this));

      // Mobile touch events
      card.addEventListener('touchstart', this.handleTouchStart.bind(this));
      card.addEventListener('touchmove', this.handleTouchMove.bind(this));
      card.addEventListener('touchend', this.handleTouchEnd.bind(this));
    });

    this.shadowRoot.querySelectorAll('.column').forEach(column => {
      column.addEventListener('dragover', this.handleDragOver.bind(this));
      column.addEventListener('drop', this.handleDrop.bind(this));

      // Ensure touch events trigger the appropriate actions
      column.addEventListener('touchmove', this.handleTouchOver.bind(this));
      column.addEventListener('touchend', this.handleTouchDrop.bind(this));
    });
  }

  handleDragStart(event) {
    this.draggedCard = event.target;
    this.draggedCard.classList.add('dragging');
    event.target.style.opacity = 0.8;
  }

  handleDragEnd(event) {
    if (this.draggedCard) {
      this.draggedCard.classList.remove('dragging');
      this.draggedCard.style.opacity = '';
      this.draggedCard = null;
      this.dragOverElement = null;
    }
  }

  handleDragOver(event) {
    event.preventDefault();
    const targetCard = event.target.closest('.card');
    if (this.draggedCard && targetCard && targetCard !== this.draggedCard) {
      this.dragOverElement = targetCard;
      const targetColumn = targetCard.closest('.column');
      if (targetColumn && this.draggedCard.closest('.column') === targetColumn) {
        // Move the dragged card in the same column
        const targetRect = targetCard.getBoundingClientRect();
        const nextSibling = (event.clientY - targetRect.top > targetRect.height / 2)
          ? targetCard.nextElementSibling : targetCard;
        if (nextSibling && nextSibling !== this.draggedCard) {
          targetColumn.insertBefore(this.draggedCard, nextSibling);
        }
      }
    }
  }

  handleDrop(event) {
    event.preventDefault();
    const targetColumn = event.target.closest('.column');
    if (targetColumn && this.draggedCard) {
      const sourceColumn = this.draggedCard.closest('.column');
      if (targetColumn && sourceColumn && targetColumn !== sourceColumn) {
        const sourceColumnId = sourceColumn.dataset.columnId;
        const targetColumnId = targetColumn.dataset.columnId;

        // Move the card in the data structure
        this.moveCard(
          sourceColumnId,
          targetColumnId,
          parseInt(this.draggedCard.dataset.cardId, 10)
        );

        // Re-render the component to reflect the change
        this.requestUpdate(); // LitElement's method to update the UI
      }
    }
    this.handleDragEnd();
  }

  handleTouchStart(event) {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
    this.draggedCard = event.target;
    this.draggedCard.classList.add('dragging');
    event.target.style.opacity = 0.8;
  }

  handleTouchMove(event) {
    const touch = event.touches[0];
    if (this.draggedCard) {
      this.draggedCard.style.position = 'absolute';
      this.draggedCard.style.left = `${touch.clientX - this.touchStartX + this.draggedCard.offsetLeft}px`;
      this.draggedCard.style.top = `${touch.clientY - this.touchStartY + this.draggedCard.offsetTop}px`;
      this.draggedCard.style.zIndex = 1000;
    }
  }

  handleTouchEnd(event) {
    if (this.draggedCard) {
      this.draggedCard.classList.remove('dragging');
      this.draggedCard.style.opacity = '';
      this.draggedCard.style.position = '';
      this.draggedCard.style.zIndex = '';
      this.draggedCard = null;
    }
  }

  handleTouchOver(event) {
    event.preventDefault();
  }

  handleTouchDrop(event) {
    const targetColumn = event.target.closest('.column');
    if (targetColumn && this.draggedCard) {
      this.handleCardMove(targetColumn);
    }
    this.handleTouchEnd(event);
  }

  handleCardMove(targetColumn) {
    const sourceColumn = this.draggedCard ? this.draggedCard.closest('.column') : null;
    if (targetColumn && sourceColumn && targetColumn !== sourceColumn) {
      const sourceColumnId = sourceColumn.dataset.columnId;
      const targetColumnId = targetColumn.dataset.columnId;

      // Move the card in the data structure
      this.moveCard(
        sourceColumnId,
        targetColumnId,
        parseInt(this.draggedCard.dataset.cardId, 10)
      );

      // Re-render the component to reflect the change
      this.requestUpdate(); // LitElement's method to update the UI
    }
  }

  moveCard(sourceColumnId, targetColumnId, cardId) {
    const sourceColumn = this.columns[sourceColumnId];
    const targetColumn = this.columns[targetColumnId];

    const cardIndex = sourceColumn.findIndex(card => card.id === cardId);
    if (cardIndex !== -1) {
      const [card] = sourceColumn.splice(cardIndex, 1);
      targetColumn.push(card);
    }
  }

  render() {
    return html`
        <!-- Header and Back Button -->
        <div class="header">
          <button class="back-button" @click="${(e) => this.goBack(e)}">←</button>
          <h2>Client Details for ${this.clientName}</h2>
        </div>

      <div class="dashboard">
        ${Object.keys(this.columns).map(columnId => html`
          <div class="column" data-column-id="${columnId}">
            <h4>${this.capitalize(columnId)}</h4>
            ${this.columns[columnId].map(card => html`
              <div class="card" draggable="true" data-card-id="${card.id}">
                <div class="card-header">${card.text}</div>
                <div class="card-subtext">${card.type}</div>
                <div class="card-footer">
                  <span class="amount">${card.amount}</span>
                </div>
              </div>
            `)}
          </div>
        `)}
      </div>
    `;
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1');
  }
}

customElements.define('my-dashboard', Dashboard);
export default Dashboard;
