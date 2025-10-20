const filmInputNode = document.querySelector('.film-input');
const addFilmBtn = document.querySelector('.arrow-btn');
const filmListNode = document.querySelector('.films-list');
const noFilm = 'Введите название фильма!';
//загрузка фильмов
loadFilmsFromLs();
//1 добавление фильма
addFilmBtn.addEventListener('click',function() {
    const film = getFilmFromUser();
    if(!film) {
        alert(noFilm);
        return;
    }
    addFilm(film);
    saveFilmsToLs();
    clearInput();
});
//2 удаление фильма
filmListNode.addEventListener('click',function(e){
   if(e.target.tagName === 'BUTTON') {
    e.target.parentElement.remove();
    saveFilmsToLs();
   }
});
//3 отметка просмотренного
filmListNode.addEventListener('change',function(e){
    const filmItem = e.target.closest('.film-item');
    const filmTitle = filmItem.querySelector('span');

    if(e.target.type === 'radio') {
        if(e.target.checked) {
          filmItem.classList.add('watched');
          filmTitle.classList.add('crossed');
        } else {
            filmItem.classList.remove('watched');
          filmTitle.classList.remove('crossed');
        }
        saveFilmsToLs();
    }
    
});
//получение фильма
function getFilmFromUser() {
    const filmName = filmInputNode.value;
    if(!filmName) {
        return;
    }
    return filmName;
}
//добавление фильма
function addFilm(filmName) {
    const filmItem = document.createElement('div')
    filmItem.classList.add('film-item')
    filmItem.innerHTML = `
                     <input type='radio'>
                     <span>${filmName}</span>
                     <button class='delete-btn'></button>
    `
    filmListNode.appendChild(filmItem);
};
//очистка поля
function clearInput() {
    filmInputNode.value = '';
}
//сохранение в лс
function saveFilmsToLs() {
    const films = [];
    document.querySelectorAll('.film-item').forEach(item => {
        const title = item.querySelector('span').textContent;
        const isWatched = item.classList.contains('watched');
        films.push({title,isWatched});
    });
    localStorage.setItem('films',JSON.stringify(films));
}
//загрузка из лс
function loadFilmsFromLs() {
    const saved = JSON.parse(localStorage.getItem('films')) || [];
    saved.forEach(film => addFilm(film.title, film.isWatched));
}