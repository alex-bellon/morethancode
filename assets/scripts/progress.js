class ProgressToggle extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });

    let rootElement = document.createElement("section");

    let styleElement = document.createElement("style");

    let moduleName = "Default";

    if (this.hasAttribute("module")) {
      moduleName = this.getAttribute("module");
    }

    const currStatus = localStorage.getItem(`${moduleName}-status`);

    styleElement.textContent = ` 
    .switch3-container {
        margin-bottom: 1.5rem;
    }
     .switch3-container h4 {
        margin-bottom: 0.7rem;
      }
      .switch3 {
        position: relative;
        height: 3rem;
        display: flex;
        justify-content: space-around;
        
      }
      .switch3 label {
        z-index: 1;
        text-align: center;
        align-content: center;
        width: 30%;
      }

      .switch3 label:focus {
        width: 33%;
      }

      .switch3 input {
        display: none;
      }

      .switch3::before {
        content: "";
        position: absolute;
        left: 0;
        width: 32%;
        height: 100%;
        background: #14142a;
        border: 1px solid #fff;
        border-radius: 12px;
        opacity: 0.5;
        transition: 0.5s left ease;
      }
      
      .switch3:has(
          input:where([type="radio"][role="toggle"][value="todo"]):checked
        )::before {
        left: 0%;
        content: "";
        pointer-events: none;
      }
      .switch3:has(
          input:where([type="radio"][role="toggle"][value="inprogress"]):checked
        )::before {
        left: 33%;
        content: "";
        pointer-events: none;
      }
      .switch3:has(
          input:where([type="radio"][role="toggle"][value="done"]):checked
        )::before {
        left: 66%;
        content: "";
        pointer-events: none;
      }
      
    `;

    rootElement.innerHTML = `
    <!-- https://dev.to/navdeepm20/3-state-switches-are-not-tough-ultimate-guide-to-css-switches-using-css-only-1gja -->
      <section class="switch3-container">
        <h4>Progress</h4>
        <section class="switch3">
          <input
            role="toggle"
            value="todo"
            type="radio"
            id="switch3-radio1"
            class="switch3-${moduleName}"
            name="radio"
            ${currStatus == "todo" ? "checked" : ""}
          />
          <label for="switch3-radio1">To Do</label>

          <input
            role="toggle"
            value="inprogress"
            type="radio"
            id="switch3-radio2"
            class="switch3-${moduleName}"
            name="radio"
            ${currStatus == "inprogress" ? "checked" : ""}
          />
          <label for="switch3-radio2">In Progress</label>

          <input
            role="toggle"
            value="done"
            type="radio"
            id="switch3-radio3-${moduleName}"
            class="switch3-${moduleName}"
            name="radio"
            ${currStatus == "done" ? "checked" : ""}
          />
          <label for="switch3-radio3-${moduleName}">Done</label>
        </section>
      </section>
    `;

    this.shadowRoot.appendChild(styleElement);
    this.shadowRoot.appendChild(rootElement);

    let radioButtons = rootElement.querySelectorAll(`.switch3-${moduleName}`);

    console.log(radioButtons);

    radioButtons.forEach((radioButton) => {
      radioButton.addEventListener("change", updateStatus);
    });

    function updateStatus() {
      console.log(`Updating status of ${moduleName}`);
      let currStatus = rootElement.querySelector(
        `input[type="radio"][role="toggle"]:checked`
      );
      console.log(currStatus);
      currStatus = currStatus ? currStatus.value : "";
      localStorage.setItem(`${moduleName}-status`, currStatus);
    }
  }
}

customElements.define("progress-toggle", ProgressToggle);
