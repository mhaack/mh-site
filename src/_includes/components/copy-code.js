const codeBlocks = document.querySelectorAll('main .prose pre code');
if (codeBlocks) {
  codeBlocks.forEach((block) => {
    const button = document.createElement('button');
    button.className = 'copy-code';
    button.innerHTML = `
      <span id="default-message" class="inline-flex px-2">
        <span class="inline-flex items-center">
          <svg class="w-3 h-3 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
          </svg>
          <span class="text-xs font-semibold">Copy code</span>
        </span>
      </span>
      <span id="success-message" class="hidden px-2">
        <span class="inline-flex items-center">
          <svg class="w-3 h-3 text-blue-700 dark:text-blue-500 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
          </svg>
          <span class="text-xs font-semibold text-blue-700 dark:text-blue-500">Copied</span>
        </span>
      </span>
    `;

    button.addEventListener('click', (event) => {
      const element = event.target;
      const pre = element.closest('pre');
      const code = pre.querySelector('code');
      const range = document.createRange();
      range.selectNode(code);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);

      const defaultMsg = pre.querySelector('#default-message');
      const successMsg = pre.querySelector('#success-message');

      const showSuccess = () => {
        defaultMsg.classList.add('hidden');
        defaultMsg.classList.remove('inline-flex');
        successMsg.classList.add('inline-flex');
        successMsg.classList.remove('hidden');
      };

      const resetToDefault = () => {
        defaultMsg.classList.remove('hidden');
        defaultMsg.classList.add('inline-flex');
        successMsg.classList.add('hidden');
        successMsg.classList.remove('inline-flex');
      };

      try {
        showSuccess();
        navigator.clipboard.writeText(range.toString());
      } catch (error) {
        console.error(error);
      }

      window.getSelection().removeAllRanges();
      setTimeout(() => {
        resetToDefault();
      }, 2000);
    });
    block.before(button);
  });
}
