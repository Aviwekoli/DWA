<style>
.overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-width: 0;
  box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
  animation-name: enter;
  animation-duration: 0.6s;
  z-index: 10;
  background-color: rgba(var(--color-light), 1);
}

@media (min-width: 30rem) {
  .overlay {
    max-width: 30rem;
    left: 0%;
    top: 0;
    border-radius: 8px;;
  }
}

.overlay__form {
  padding-bottom: 0.5rem;
  margin: 0 auto;
}

.overlay__row {
  display: flex;
  gap: 0.5rem;
  margin: 0 auto;
  justify-content: center;
}

.overlay__button {
  font-family: Roboto, sans-serif;
  background-color: rgba(var(--color-blue), 0.1);
  transition: background-color 0.1s;
  border-width: 0;
  border-radius: 6px;
  height: 2.75rem;
  cursor: pointer;
  width: 50%;
  color: rgba(var(--color-blue), 1);
  font-size: 1rem;
  border: 1px solid rgba(var(--color-blue), 1);
}

.overlay__button_primary {
  background-color: rgba(var(--color-blue), 1);
  color: rgba(var(--color-force-light), 1);
}

.overlay__button:hover {
  background-color: rgba(var((var(--color-blue))), 0.2);
}


.overlay__button_primary:hover {
  background-color: rgba(var(--color-blue), 0.8);
  color: rgba(var(--color-force-light), 1);
}

.overlay__input {
  width: 100%;
  margin-bottom: 0.5rem;
  background-color: rgba(var(--color-dark), 0.05);
  border-width: 0;
  border-radius: 6px;
  width: 100%;
  height: 4rem;
  color: rgba(var(--color-dark), 1);
  padding: 1rem 0.5rem 0 0.75rem;
  font-size: 1.1rem;
  font-weight: bold;
  font-family: Roboto, sans-serif;
  cursor: pointer;
}

.overlay__input_select {
  padding-left: 0.5rem;
}

.overlay__field {
  position: relative;
  display: block;
}

.overlay__label {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  font-size: 0.85rem;
  color: rgba(var(--color-dark), 0.4);
}

.overlay__input:hover {
  background-color: rgba(var(--color-dark), 0.1);
}

.overlay__title {
  padding: 1rem 0 0.25rem;
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1;
  letter-spacing: -0.1px;
  max-width: 25rem;
  margin: 0 auto;
  color: rgba(var(--color-dark), 0.8)
}

.overlay__blur {
  width: 100%;
  height: 200px;
  filter: blur(10px);
  opacity: 0.5;
  transform: scale(2);
}

.overlay__image {
  max-width: 10rem;
  position: absolute;
  top: 1.5m;
  left: calc(50% - 5rem);
  border-radius: 2px;
  box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
}

.overlay__data {
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  color: rgba(var(--color-dark), 0.8)
}

.overlay__data_secondary {
  color: rgba(var(--color-dark), 0.6)
}

.overlay__content {
  padding: 2rem 1.5rem;
  text-align: center;
  padding-top: 3rem;
}

.overlay__preview {
  overflow: hidden;
  margin: -1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.overlay__background {
  background: rgba(var(--color-dark), 0.6);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}

option {
  background-color: rgba(var(--color-light), 1);
  color: rgba(var(--color-dark), 0.8);
}

@keyframes enter {
  from {
    transform: translateY(10rem);
  }
  to {
    transform: translateY(0);
  }
}
:root {
  --color-blue: 0, 150, 255;
  --color-force-dark: 10, 10, 20;
  --color-force-light: 255, 255, 255;
  --color-dark: 10, 10, 20;
  --color-light: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-dark:  255, 255, 255; 
    --color-light: 10, 10, 20;
  }
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  min-width: 100%;
  font-family: Roboto, sans-serif;
  color: rgba(var(--color-dark), 0.9);
  background: linear-gradient(0deg, rgba(var(--color-dark), 0.2), rgba(var(--color-dark), 0.1)), rgba(var(--color-light), 1);
}

.backdrop {
  display: none;
  background: rgba(var(--color-dark), 0.3);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}

.overlay[open] ~ .backdrop {
  display: block;
}
</style>