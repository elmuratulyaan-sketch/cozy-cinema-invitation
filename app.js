const dialog = document.querySelector('#invitation');
const join = document.querySelector('#join');
const config = window.INVITATION || {};
const whatsapp = document.querySelector('#whatsapp');
if (/^\d{7,15}$/.test(config.whatsappNumber || '')) {
  whatsapp.href = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent('Аян, келістік ♡ «Любовь на прокат» сериалын бірге бастайық! Қай уақытта қосамыз?')}`;
  whatsapp.hidden = false;
  document.querySelector('#whatsapp-hint').hidden = false;
}
const music = document.querySelector('#music');
const musicToggle = document.querySelector('#music-toggle');
let musicAttempted = false;
if (config.musicFile) {
  music.src = config.musicFile;
  music.volume = 0.15;
  musicToggle.hidden = false;
}
function syncMusic() {
  musicToggle.textContent = music.paused ? '♫ Әуенді қосу' : 'Ⅱ Әуенді тоқтату';
  musicToggle.setAttribute('aria-pressed', String(!music.paused));
}
async function playMusic() {
  try { await music.play(); } catch { musicToggle.textContent = '♫ Әуен қосылмады — қайта көру'; }
}
musicToggle.addEventListener('click', () => {
  musicAttempted = true;
  if (music.paused) playMusic(); else music.pause();
});
music.addEventListener('play', syncMusic);
music.addEventListener('pause', syncMusic);
join.addEventListener('click', () => {
  if (config.musicFile && !musicAttempted) { musicAttempted = true; playMusic(); }
  dialog.showModal();
  document.body.classList.add('modal-open');
});
document.querySelector('#close').addEventListener('click', () => dialog.close());
const done = document.querySelector('#done');
const reply = document.createElement('p');
reply.className = 'sweet-reply';
reply.setAttribute('role', 'status');
reply.setAttribute('aria-live', 'polite');
done.after(reply);
const hearts = document.createElement('div');
hearts.className = 'heart-shower';
hearts.setAttribute('aria-hidden', 'true');
dialog.append(hearts);
done.addEventListener('click', () => {
  dialog.classList.add('agreed');
  reply.textContent = 'Келістік, жаным ♡ Осы кешті сенімен күтемін.';
  done.textContent = 'Келістік ♡';
  hearts.replaceChildren();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  for (let i = 0; i < (reduced ? 5 : 22); i++) {
    const heart = document.createElement('span');
    heart.textContent = i % 3 === 0 ? '♥' : '♡';
    heart.style.setProperty('--x', `${8 + Math.random() * 84}%`);
    heart.style.setProperty('--drift', `${(Math.random() - 0.5) * 100}px`);
    heart.style.setProperty('--size', `${16 + Math.random() * 23}px`);
    heart.style.setProperty('--delay', `${Math.random() * 0.65}s`);
    heart.style.setProperty('--turn', `${(Math.random() - 0.5) * 50}deg`);
    hearts.append(heart);
    heart.addEventListener('animationend', () => heart.remove(), { once: true });
  }
});
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  }
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  join.focus();
});
