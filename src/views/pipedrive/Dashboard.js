class Dashboard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      this.columns = {
        firstMeeting: [{ id: 1, text: 'Adrian Coutinho deal' }, /* other cards */],
        secondMeeting: [{ id: 2, text: 'Global Sinking Fund' }, /* other cards */],
        deciding: [{ id: 3, text: 'Kerry Lennon deal' }, /* other cards */],
        accepted: [{ id: 4, text: 'Dube Preservation' }, /* other cards */],
        businessSubmitted: [{ id: 5, text: 'Isabell Rühle deal' }, /* other cards */],
        awaitingPayment: [{ id: 6, text: 'CFW deal' }, /* other cards */],
        finalized: [{ id: 7, text: 'Neethal Natha deal' }, /* other cards */],
      };
  
      this.draggedCard = null;  // Store the card being dragged
    }
  
    connectedCallback() {
      this.render();
      this.addEventListeners();
    }
  
    // Add event listeners for drag and drop
    addEventListeners() {
      this.shadowRoot.querySelectorAll('.card').forEach(card => {
        card.addEventListener('dragstart', this.handleDragStart.bind(this));
        card.addEventListener('dragend', this.handleDragEnd.bind(this));
      });
  
      this.shadowRoot.querySelectorAll('.column').forEach(column => {
        column.addEventListener('dragover', this.handleDragOver.bind(this));
        column.addEventListener('drop', this.handleDrop.bind(this));
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
          this.render();
          this.addEventListeners();
        }
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
      // Define the CSS styles
      const style = `
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
          padding: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          min-height: 400px;
          margin: 10px;
        }
  
        .card {
          background-color: #ffffff;
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 10px;
          margin-bottom: 10px;
          cursor: move;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
      `;
  
      // Generate the columns with cards
      const columnsHtml = Object.keys(this.columns).map(columnId => `
        <div class="column" data-column-id="${columnId}">
          <h3>${this.capitalize(columnId)}</h3>
          ${this.columns[columnId].map(card => `
            <div class="card" draggable="true" data-card-id="${card.id}">
              ${card.text}
            </div>
          `).join('')}
        </div>
      `).join('');
  
      // Apply styles and content to shadow DOM
      this.shadowRoot.innerHTML = `
        <style>${style}</style>
        <div class="dashboard">
          ${columnsHtml}
        </div>
      `;
    }
  
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1');
    }
  }
  
  customElements.define('my-dashboard', Dashboard);
  