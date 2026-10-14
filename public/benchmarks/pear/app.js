const fieldNames = {
  name: { label: 'Your name', autocomplete: 'name' },
  email: { label: 'Work email', autocomplete: 'email' },
  grow: { label: 'What do you want to grow?', autocomplete: 'off' },
};

const dialog = document.createElement('dialog');
dialog.className = 'application-preview';
dialog.setAttribute('aria-labelledby', 'application-title');
dialog.innerHTML = `
  <button class="preview-close" type="button" aria-label="Close application preview">×</button>
  <p class="preview-label">The application</p>
  <h2 id="application-title">Your application is ready.</h2>
  <p>This is a local preview. Your details have not been sent to Pear. You can download a copy of your application below.</p>
  <button class="preview-download" type="button">Download application <span aria-hidden="true">↓</span></button>
  <p class="preview-status" role="status"></p>
`;
document.body.appendChild(dialog);

let application = null;
let returnFocus = null;

function closePreview() {
  dialog.close();
  document.documentElement.classList.remove('preview-open');
  application = null;
  returnFocus?.focus({ preventScroll: true });
}

dialog.querySelector('.preview-close').addEventListener('click', closePreview);
dialog.addEventListener('cancel', event => {
  event.preventDefault();
  closePreview();
});
dialog.addEventListener('keydown', event => event.stopPropagation());
dialog.addEventListener('wheel', event => event.stopPropagation(), { passive: true });
dialog.addEventListener('touchmove', event => event.stopPropagation(), { passive: true });
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closePreview();
});

dialog.querySelector('.preview-download').addEventListener('click', () => {
  if (!application) return;
  const contents = [
    'Pear partnership application',
    'Local preview — not submitted',
    '',
    `Name: ${application.name}`,
    `Work email: ${application.email}`,
    '',
    'What do you want to grow?',
    application.grow,
    '',
  ].join('\n');
  const url = URL.createObjectURL(new Blob([contents], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'pear-partnership-application.txt';
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  dialog.querySelector('.preview-status').textContent = 'Your application has been downloaded.';
});

function prepareFields() {
  const container = document.querySelector('.cf-in');
  if (!container || container.dataset.localReady) return;
  for (const [name, options] of Object.entries(fieldNames)) {
    const input = container.querySelector(`[data-k="${name}"]`);
    if (!input) return;
    input.name = name;
    input.required = true;
    input.autocomplete = options.autocomplete;
    input.setAttribute('aria-label', options.label);
    if (name === 'email') input.pattern = '[^\\s@]+@[^\\s@]+\\.[^\\s@]+';
    input.addEventListener('input', () => {
      input.setCustomValidity('');
      input.removeAttribute('aria-invalid');
    });
  }
  container.dataset.localReady = 'true';
}

function previewApplication(button) {
  prepareFields();
  const values = {};
  for (const name of Object.keys(fieldNames)) {
    const field = document.querySelector(`.cf-in [data-k="${name}"]`);
    if (!field) return;
    field.setCustomValidity('');
    if (!field.value.trim()) field.setCustomValidity(`Please enter ${name === 'grow' ? 'what you want to grow' : name === 'email' ? 'your work email' : 'your name'}.`);
    if (!field.checkValidity()) {
      field.setAttribute('aria-invalid', 'true');
      field.focus({ preventScroll: true });
      field.reportValidity();
      return;
    }
    field.removeAttribute('aria-invalid');
    values[name] = field.value.trim();
  }
  application = values;
  returnFocus = button;
  dialog.querySelector('.preview-status').textContent = '';
  document.documentElement.classList.add('preview-open');
  dialog.showModal();
}

document.addEventListener('click', event => {
  const button = event.target.closest?.('.cf-cta');
  if (!button) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  previewApplication(button);
}, true);

document.addEventListener('keydown', event => {
  if (event.key === 'Enter' && event.target.matches('.cf-in input')) {
    event.preventDefault();
    previewApplication(document.querySelector('.cf-cta'));
  }
});

// The original animation creates its fields after React mounts the scene.
const observer = new MutationObserver(() => {
  prepareFields();
  if (document.querySelector('.cf-in[data-local-ready]')) observer.disconnect();
});
observer.observe(document.getElementById('root'), { childList: true, subtree: true });
prepareFields();
