    console.log("coucou")

    const playlist = document.getElementById("playlist");
    const audioPlayer = document.getElementById("audioPlayer");
    const currentMusicTitle = document.getElementById("currentMusicTitle");
    const currentMusicImage = document.getElementById("currentMusicImage");
    const vinyleImage = document.getElementById("vinyleImage");
    const randomButton = document.getElementById("randomButton");

    const config = {
        urlCover: "uploads/covers/",
        urlSound: "uploads/musics/",
    };

    const musics = [
        {
            id: 1,
            cover: "notredame.jpeg",
            sound: "GazoTiakola.mp3",
            title: "Notre-Dame - Gazo ft. Tiakola",
            category: "Pop Urbaine",
        },
        {
            id: 2,
            cover: "panama.jpeg",
            sound: "Panama.mp3",
            title: "Panama - Kaaris",
            category: "Rap",
        },
        {
            id: 3,
            cover: "fautpas.jpeg",
            sound: "PLK_ft_JUL-Faut_pas.mp3",
            title: "Faut pas - PLK ft. JUL",
            category: "Pop Urbaine",
        },
        {
            id : 4,
            cover : "Pyramide.jpeg",
            sound : "Werenoi_ft_Damso-Pyramide.mp3",
            title : "Pyramide - Werenoi ft. Damso",
            category : "Rap"
        },
        {
            id : 5,
            cover : "4motion.jpeg",
            sound : "Maes_4Motion.mp3",
            title : "4Motion - Maes ft. PLK",
            category : "Pop Urbaine"
        },
        {
            id : 6,
            cover : "boucan.jpeg",
            sound : "Keblack_Ft_Franglish-Boucan.mp3",
            title : "Boucan - Keblack ft. Franglish",
            category : "Pop Urbaine"
        },
        {
            id : 7,
            cover : "arret.jpg",
            sound : "Kalash_Criminel_ft_Kaaris-Arrêt du cœur.mp3",
            title : "Arrêt du cœur - Kalash Criminel ft. Kaaris",
            category : "Rap"
        },
        {
            id : 8,
            cover : "zoo.jpeg",
            sound : "Kaaris_Zoo.mp3",
            title : "Zoo - Kaaris",
            category : "Rap"
        },
    ];

    
    // Fonction pour mettre à jour le titre de la musique en cours de lecture et l'image de la musique dans le footer
    const updateMusicInfo = (musicTitle, musicImage) => {
        currentMusicTitle.textContent = musicTitle;
        currentMusicImage.src = config.urlCover + musicImage;
    };

    // Fonction pour charger l'image de fond du vinyle
    const loadVinyleBackground = (vinyleBackgroundImage) => {
        vinyleImage.style.backgroundImage = `url(${vinyleBackgroundImage})`;
    };

    // Ajout des écouteurs d'événements pour chaque élément de la playlist
    musics.forEach((music) => {
        const li = document.createElement('li');
        li.innerHTML = `<h2>${music.title}</h2> <img src=${config.urlCover}${music.cover} alt="${music.title}"/> <div> <small>${music.category}</small> </div>`;
        li.addEventListener('click', function () {
            audioPlayer.src = `${config.urlSound}${music.sound}`;
            loadVinyleBackground(config.urlCover + 'vinyle_background.jpg'); // Charger l'image de fond du vinyle
            updateMusicInfo(music.title, music.cover);
            audioPlayer.play(); // Lancer la lecture de la musique
        });
        playlist.appendChild(li);
    });

    // Ajout d'un écouteur d'événement pour le lecteur audio afin de mettre à jour le titre de la musique en cours de lecture et l'image de la musique dans le footer
    audioPlayer.addEventListener('play', function () {
        // Trouver la musique correspondante dans la liste
        const music = musics.find(m => m.sound === audioPlayer.src.split('/').pop());
        if (music) {
            updateMusicInfo(music.title, music.cover);
        }
    });

    audioPlayer.addEventListener('play', function () {
        vinyleImage.classList.remove('paused');
    });

    audioPlayer.addEventListener('pause', function () {
        vinyleImage.classList.add('paused');
    });

    randomButton.addEventListener("click", function() {
        // Générer un index aléatoire pour choisir une musique
        const randomIndex = Math.floor(Math.random() * musics.length);

        // Récupérer la musique correspondant à l'index aléatoire
        const randomMusic = musics[randomIndex];

        // Charger et jouer la musique aléatoire
        audioPlayer.src = `${config.urlSound}${randomMusic.sound}`;
        loadVinyleBackground(config.urlCover + 'vinyle_background.jpg'); // Charger l'image de fond du vinyle
        updateMusicInfo(randomMusic.title, randomMusic.cover);
        audioPlayer.play();
    });

