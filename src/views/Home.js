import { html, LitElement, css } from 'lit';
import { router } from '../Routing';
import { sharedStyles } from '/src/styles/shared-styles';
import { store } from '/src/Store';
import { clients } from '/src/constants/ClientList';
import { ClientProfileService } from '/src/services/ClientProfileService';

class Home extends LitElement {

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        padding: 20px;
        font-family: Arial, sans-serif;
      }

      .home-container {
        max-width: 900px;
        margin: 0 auto;
        padding: 0 10px;
      }

      .header-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }

      .header-icons {
        display: flex;
        gap: 15px;
      }

      .header-icons img {
        width: 24px;
        height: 24px;
        cursor: pointer;
      }

      .header-image {
        width: 100%;
        height: 200px;
        background-size: cover;
        background-position: center;
        border-radius: 10px;
        margin-bottom: 20px;
        position: relative;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        background-color: black;
      }

      .header-buttons {
        display: flex;
        gap: 15px;
      }

      .header-buttons button {
        padding: 10px 20px;
        font-size: 0.9rem;
        cursor: pointer;
      }

      h2 {
        margin-bottom: 20px;
        font-size: 1.5rem;
        color: #333;
      }

      .section-title {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        font-size: 1.1rem;
        margin-top: 1.1rem;
      }

      .search-container {
        display: flex;
        gap: 20px;
        margin-bottom: 30px;
        flex-wrap: wrap;
      }

      .search-input {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 250px;
      }

      .search-input input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 1rem;
        margin-left: -3px;
        margin-top: 5px;
      }

      .client-buttons {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        margin-bottom: 20px;
      }

      .client-buttons button {
        flex: 1;
        padding: 10px;
        font-size: 1rem;
        cursor: pointer;
      }

      .recent-clients, .documents {
        display: flex;
        gap: 20px;
        overflow-x: auto;
        flex-wrap: wrap;
      }

      .client-item, .document-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        width: 100px;
        margin-bottom: 20px;
        cursor: pointer;
      }

      .client-avatar, .document-icon {
        width: 60px;
        height: 60px;
        background-color: #e0e0e0;
        border-radius: 50%;
        margin-bottom: 10px;
      }

      .document-icon {
        border-radius: 10px;
      }

      .recent-clients h4, .document-item h4 {
        font-size: 0.9rem;
      }

      @media (max-width: 768px) {
        .header-image {
          height: 120px;
        }

        .header-buttons {
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin-top: 10px;
          position: absolute;
        }

        .client-buttons {
          flex-direction: column;
        }

        .background-image {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .myCanvas {
    height: 100px;
    width: 610px;
            }
      }

      .myCanvas {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        pointer-events: none;
      }
    `
  ];

  constructor() {
    super();
    this.clientList = clients;
    this.initialise();
  }

  async initialise() {
    try {
      const clientProfileService = new ClientProfileService();
      let clientList = await clientProfileService.getAllClients();
      this.clientList = clientList.length > 0 ? clientList : clients;
      console.log('Client list initialized:', this.clientList); // For debugging purposes
      this.requestUpdate(); // To re-render the component with the updated client list
    } catch (error) {
      console.error('Failed to initialize client list', error);
    }
  }

  firstUpdated() {
    super.firstUpdated();
    this.addEnterKeyListener();
    this.initCanvas();
  }

  addEnterKeyListener() {
    this.shadowRoot.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this._existingClient(event);
      }
    });
  }

  initCanvas() {
    const canvas = this.shadowRoot.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const stars = [];
    const numStars = 100;

    // Set canvas size
    canvas.width = this.shadowRoot.querySelector('.header-image').clientWidth;
    canvas.height = this.shadowRoot.querySelector('.header-image').clientHeight;

    for (let i = 0; i < numStars; i++) {
        const color = Math.random() > 0.5 ? '#ADD8E6' : 'white'; // 50% chance for light blue or white dots
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            dx: Math.random() * 0.2 - 0.1, // Slower movement speed
            dy: Math.random() * 0.2 - 0.1, // Slower movement speed
            color: color
        });
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        for (let i = 0; i < numStars; i++) {
            const star = stars[i];
            ctx.fillStyle = star.color;
            ctx.moveTo(star.x, star.y);
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        }
        ctx.fill();

        // Draw the label "ByteMe" in the middle of the canvas
        ctx.fillStyle = 'white';
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('ByteMe', canvas.width / 2, canvas.height / 2);

        drawConnections();
        updateStars();
    }

    function drawConnections() {
        for (let i = 0; i < numStars; i++) {
            const star1 = stars[i];
            const closestStars = findClosestStars(star1, stars, 3);

            if (closestStars.length >= 3) {
                ctx.beginPath();
                ctx.moveTo(star1.x, star1.y);
                ctx.lineTo(closestStars[0].x, closestStars[0].y);
                ctx.lineTo(closestStars[1].x, closestStars[1].y);
                ctx.lineTo(star1.x, star1.y);
                ctx.strokeStyle = '#7DF9FF'; // Electric blue color for the lines
                ctx.stroke();
            }
        }
    }

    function findClosestStars(star, stars, numClosest) {
        const distances = stars.map(otherStar => {
            if (otherStar !== star) {
                const dx = star.x - otherStar.x;
                const dy = star.y - otherStar.y;
                return {
                    star: otherStar,
                    distance: Math.sqrt(dx * dx + dy * dy)
                };
            }
            return null;
        }).filter(Boolean);

        distances.sort((a, b) => a.distance - b.distance);

        return distances.slice(0, numClosest).map(d => d.star);
    }

    function updateStars() {
        for (let i = 0; i < numStars; i++) {
            const star = stars[i];
            star.x += star.dx;
            star.y += star.dy;

            // Reflect stars off the canvas edges
            if (star.x < 0 || star.x > canvas.width) star.dx = -star.dx;
            if (star.y < 0 || star.y > canvas.height) star.dy = -star.dy;
        }
    }

    function animate() {
        drawStars();
        requestAnimationFrame(animate);
    }

    animate();

    canvas.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        for (let i = 0; i < numStars; i++) {
            const star = stars[i];
            const dx = star.x - mouseX;
            const dy = star.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Push stars away from the cursor
            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                const force = (100 - distance) / 100; // Closer stars are pushed more
                star.dx += Math.cos(angle) * force * 2;
                star.dy += Math.sin(angle) * force * 2;
            }
        }
    });

    // Adjust canvas size on window resize
    window.addEventListener('resize', () => {
        canvas.width = this.shadowRoot.querySelector('.header-image').clientWidth;
        canvas.height = this.shadowRoot.querySelector('.header-image').clientHeight;
    });
}

  navigateToClientDetails(event, client) {
    event.preventDefault();
    store.set('clientInfo', { client });
    router.navigate('/summary');
  }

  _newClient(event) {
    event.preventDefault();
    router.navigate('/client');
  }

  _existingClient(event) {
    event.preventDefault();
    const name = this.shadowRoot.getElementById('name').value;
    const id = this.shadowRoot.getElementById('id').value;

    store.set('searchParams', { name, id });

    router.navigate('/list');
  }

  render() {
    return html`
      <div class="home-container">
        <div class="header-image">
          <canvas class="myCanvas" id="canvas">
          </canvas>
        </div>
        <!-- Search Client Section -->
        <div class="header">
          <h3>Search client</h3>
        </div>
        <div class="search-container">
          <div class="search-input">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" placeholder="John Doe" />
          </div>
          <div class="search-input">
            <label for="id">ID Number</label>
            <input type="text" id="id" name="id" placeholder="9809240106084" />
          </div>
        </div>

        <!-- New Client and Existing Client Buttons -->
        <div class="client-buttons">
          <button class="my-button" @click="${(e) => this._newClient(e)}">New Client</button>
          <button class="my-button" @click="${(e) => this._existingClient(e)}">Existing Client</button>
        </div>

        <!-- Recent Clients Section -->
        <div class="section-title">
          <h3>Recent clients (7 of 50)</h3>
        </div>
        <div class="recent-clients">
          ${this.renderRecentClients()}
        </div>
                <div class="header-buttons">
          <button class="my-button" @click="${() => router.navigate('/list')}">View all clients</button>
          <button class="my-button" @click="${() => router.navigate('/dashboard')}">Dashboard</button>
        </div>

      </div>
    `;
  }

  renderRecentClients() {
    const recentClients = [...this.clientList].sort((a, b) => new Date(b.lastInteractionDate) - new Date(a.lastInteractionDate)).slice(0, 7);
    return recentClients.map(client => html`
      <div class="client-item" @click="${(e) => this.navigateToClientDetails(e, client)}">
        <div class="client-avatar"></div>
        <h4>${client.name}</h4>
      </div>
    `);
  }
}

customElements.define('my-home', Home);

export default Home;
