'use strict';

const letter = document.querySelector('#letter-dialog');
let letterOpener;
document.querySelectorAll('[data-open-letter]').forEach(button => {
  button.addEventListener('click', () => {
    letterOpener = button;
    letter.showModal();
    document.body.classList.add('modal-open');
    document.querySelector('#letter-scroll').scrollTop = 0;
    document.querySelector('#letter-title').focus({ preventScroll: true });
  });
});
document.querySelector('#close-letter').addEventListener('click', () => letter.close());
letter.addEventListener('click', event => {
  if (event.target !== letter) return;
  const rect = letter.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) letter.close();
});
letter.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  letterOpener?.focus({ preventScroll: true });
});

const sun = document.querySelector('#sun-button');
const morningCard = document.querySelector('#morning-card');
const messages = [
  ['Пусть день будет к тебе добрым.', 'с самого первого глотка утреннего чая'],
  ['Твоей улыбке идёт это утро.', 'и мне хотелось стать одним из поводов для неё'],
  ['Сегодня можно сиять просто так.', 'тебе для этого даже не нужно стараться'],
  ['Пусть хорошее найдёт тебя само.', 'в любимой песне, случайной встрече, маленькой удаче'],
  ['Одна красивая мысль на утро.', 'где-то далеко сейчас очень рады, что познакомились с тобой']
];
let messageIndex = 0;
sun.addEventListener('click', () => {
  morningCard.classList.add('lit');
  sun.setAttribute('aria-label', 'Ещё одно тёплое пожелание');
  const [message, hint] = messages[messageIndex % messages.length];
  document.querySelector('#sun-message').textContent = message;
  document.querySelector('#sun-hint').textContent = hint;
  document.querySelector('#sun-instruction').firstChild.textContent = 'коснись ещё раз ';
  messageIndex += 1;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const bounds = sun.getBoundingClientRect();
  const layer = document.querySelector('#sparkles');
  layer.replaceChildren();
  for (let i = 0; i < 9; i += 1) {
    const spark = document.createElement('span');
    spark.className = 'floating-spark';
    spark.textContent = i % 3 === 0 ? '✧' : '·';
    spark.style.left = `${bounds.left + bounds.width / 2 + (Math.random() - .5) * 70}px`;
    spark.style.top = `${bounds.top + bounds.height / 2 + (Math.random() - .5) * 35}px`;
    spark.style.setProperty('--dx', `${(Math.random() - .5) * 160}px`);
    spark.style.setProperty('--rot', `${(Math.random() - .5) * 70}deg`);
    spark.style.animationDelay = `${i * .035}s`;
    layer.append(spark);
    spark.addEventListener('animationend', () => spark.remove(), { once: true });
  }
});
