(() => {
  'use strict';

  if (window.__velvetResponseEmailLoaded) return;
  window.__velvetResponseEmailLoaded = true;

  const ENDPOINT = 'https://script.google.com/macros/s/AKfycbzEtz1wO9rfrVCImB2Gl_x0o2TsYuBObCyAop64KCdx7UFP2_ySuPbglfnitKAfkbm1/exec';

  document.addEventListener('click', event => {
    const button = event.target.closest('#answerYes, #answerMaybe');
    if (!button) return;

    // Prevent duplicate submissions from repeated taps.
    if (button.dataset.sending === 'true') return;
    button.dataset.sending = 'true';

    let visitorName = 'Anonymous';
    try {
      visitorName =
        (localStorage.getItem('velvetVisitorName') || '').trim() ||
        (localStorage.getItem('visitorName') || '').trim() ||
        'Anonymous';
    } catch (_) {}

    // Preserve the visitor's actual choice.
    const answer = button.id === 'answerYes' ? 'YES' : 'MAYBE';
    const status = document.getElementById('questionResponse');

    let frame = document.getElementById('vhResponseFrame');
    if (!frame) {
      frame = document.createElement('iframe');
      frame.id = 'vhResponseFrame';
      frame.name = 'vhResponseFrame';
      frame.hidden = true;
      frame.title = 'Response submission';
      document.body.appendChild(frame);
    }

    let form = document.getElementById('vhResponseForm');
    if (!form) {
      form = document.createElement('form');
      form.id = 'vhResponseForm';
      form.method = 'POST';
      form.target = 'vhResponseFrame';
      form.hidden = true;

      ['visitorName', 'answer', 'page'].forEach(name => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.id = 'vhResponse_' + name;
        form.appendChild(input);
      });

      document.body.appendChild(form);
    }

    document.getElementById('vhResponse_visitorName').value =
      visitorName.slice(0, 40);
    document.getElementById('vhResponse_answer').value = answer;
    document.getElementById('vhResponse_page').value =
      'Velvet Hearts Question';

    form.action = ENDPOINT;

    if (status) {
      status.textContent = 'Sending your response…';
    }

    try {
      form.submit();
      if (status) {
        status.textContent =
          'Your response was sent to the submission service. Email delivery is not confirmed here. Thank you ♡';
      }
    } catch (error) {
      button.dataset.sending = 'false';
      if (status) {
        status.textContent =
          'We could not submit your response. Please try again.';
      }
    }
  });
})();
