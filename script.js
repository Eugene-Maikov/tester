function copyFormatInfo() {
  const el = document.querySelector('.format-info');
  const btn = document.getElementById('copyFormatBtn');
  if (!el || !btn) return;

  const temp = document.createElement('textarea');
  temp.style.position = 'fixed';
  temp.style.opacity = '0';
  temp.value = el.innerText;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand('copy');
  document.body.removeChild(temp);

  const originalText = btn.textContent;
  btn.textContent = 'Скопировано!';
  btn.style.backgroundColor = '#4caf50';

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.backgroundColor = '';
  }, 1500);
}

function insertQuestions() {
  const container = document.getElementById('questionContainer');
  const input = document.getElementById('inputArea').value;
  container.innerHTML = input;

  // Показываем кнопку "Проверить"
  document.querySelector('.check-panel').classList.remove('hidden');
}

function checkAnswers() {
  const questions = document.querySelectorAll('.question');
  let allCorrect = true;

  questions.forEach((q, index) => {
    q.classList.remove('wrong');
    const correct = q.dataset.correct;
    const inputs = q.querySelectorAll('input');
    if (!inputs.length) return;

    const type = inputs[0].type;
    let selectedValues = [];

    if (type === 'radio') {
      const selected = q.querySelector('input:checked');
      if (!selected || selected.value !== correct) {
        q.classList.add('wrong');
        allCorrect = false;
      }
    } else if (type === 'checkbox') {
      const selected = q.querySelectorAll('input:checked');
      selected.forEach(input => selectedValues.push(input.value));

      const correctSet = new Set(correct.split(',').map(String));
      const selectedSet = new Set(selectedValues.map(String));

      if (
        selectedSet.size !== correctSet.size ||
        [...selectedSet].some(val => !correctSet.has(val))
      ) {
        q.classList.add('wrong');
        allCorrect = false;
      }
    }
  });

  const result = document.getElementById('result');
  if (allCorrect) {
    result.textContent = '🎉 Поздравляем! Все ответы верны. Тест пройден!';
    result.style.color = '#80ff80';
  } else {
    result.textContent = 'Некоторые ответы неверны. Попробуйте ещё раз.';
    result.style.color = '#ff8080';
  }
}

