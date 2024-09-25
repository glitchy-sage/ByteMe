import { html, LitElement, css } from 'lit';
import { sharedStyles } from '/src/styles/shared-styles'; // Assuming you have shared styles

class Dashboard extends LitElement {
  
  static properties = {
    columns: { type: Object },
    draggedCard: { type: Object }
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
  }

  firstUpdated() {
    super.firstUpdated();
    this.addEventListeners();
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
    event.target.style.opacity = 0.5;
  }

  handleDragEnd(event) {
    event.target.style.opacity = '';
    this.draggedCard = null;
  }

  handleDragOver(event) {
    event.preventDefault();
  }

  handleDrop(event) {
    event.preventDefault();
    const targetColumn = event.target.closest('.column');
    if (targetColumn && this.draggedCard) {
      const sourceColumn = this.draggedCard.closest('.column');
      if (targetColumn !== sourceColumn) {
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
  }

  handleTouchStart(event) {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
    this.draggedCard = event.target;
    event.target.style.opacity = 0.5;
  }

  handleTouchMove(event) {
    const touch = event.touches[0];
    this.draggedCard.style.position = 'absolute';
    this.draggedCard.style.left = `${touch.clientX - this.touchStartX + this.draggedCard.offsetLeft}px`;
    this.draggedCard.style.top = `${touch.clientY - this.touchStartY + this.draggedCard.offsetTop}px`;
    this.draggedCard.style.zIndex = 1000;
  }

  handleTouchEnd(event) {
    this.draggedCard.style.opacity = '';
    this.draggedCard.style.position = '';
    this.draggedCard.style.zIndex = '';
    this.draggedCard = null;
  }

  handleTouchOver(event) {
    event.preventDefault();
  }

  handleTouchDrop(event) {
    const targetColumn = event.target.closest('.column');
    if (targetColumn && this.draggedCard) {
      this.handleCardMove(targetColumn);
    }
  }

  handleCardMove(targetColumn) {
    const sourceColumn = this.draggedCard.closest('.column');
    if (targetColumn !== sourceColumn) {
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
