// ========================================
// DulcesSiSaFashion - Main JavaScript
// ========================================

// ========== Video Header Slider ==========
let currentVideoSlide = 0;
const videoSlides = [];
let videoSliderInterval;

function initVideoSlider() {
    const slidesContainer = document.getElementById('video-slides');
    if (!slidesContainer) return;

    const slides = slidesContainer.querySelectorAll('.video-slide');
    videoSlides.push(...slides);

    if (videoSlides.length === 0) return;

    // Show first slide
    showVideoSlide(0);

    // Auto-advance every 15 seconds
    videoSliderInterval = setInterval(() => {
        nextVideoSlide();
    }, 15000);
}

function showVideoSlide(index) {
    if (videoSlides.length === 0) return;

    // Wrap around
    if (index >= videoSlides.length) {
        currentVideoSlide = 0;
    } else if (index < 0) {
        currentVideoSlide = videoSlides.length - 1;
    } else {
        currentVideoSlide = index;
    }

    // Hide all slides
    videoSlides.forEach((slide, i) => {
        slide.style.display = i === currentVideoSlide ? 'block' : 'none';
        const video = slide.querySelector('video');
        if (video) {
            if (i === currentVideoSlide) {
                video.play().catch(e => console.log('Autoplay prevented:', e));
            } else {
                video.pause();
            }
        }
    });
}

function nextVideoSlide() {
    showVideoSlide(currentVideoSlide + 1);
}

// ========== Specialty Modals ==========
const specialtyModals = {
    bodas: null,
    cumpleanos: null,
    eventos: null
};

function openSpecialtyModal(type) {
    const modal = document.getElementById(`modal-${type}`);
    if (modal) {
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }
}

function closeSpecialtyModal(type) {
    const modal = document.getElementById(`modal-${type}`);
    if (modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
}

function initSpecialtyModals() {
    // Add click outside to close
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
    });

    // Add escape key handler
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                modal.classList.remove('active');
                document.body.classList.remove('modal-open');
            });
        }
    });
}

// ========== Cake Gallery Slider ==========
let currentCakeSlide = 0;
let cakeSliderInterval;
const cakesData = [
    { img: '1.jpeg', video: '1.mp4', title: 'Tarta Princesa Rosa - Cumpleaños Mágico', desc: 'Esta exquisita tarta de dos pisos es el sueño hecho realidad para cualquier pequeña princesa. Decorada con delicados tonos rosados, buttercream artesanal y una corona de cristal brillante, cada detalle está cuidadosamente diseñado para crear momentos inolvidables. Las mariposas comestibles y las perlas de azúcar añaden un toque de elegancia y fantasía. Perfecta para cumpleaños de 3 a 10 años, esta creación personalizada puede adaptarse a los colores y temas favoritos de tu pequeña. En DulcesSiSaFashion, transformamos cada celebración en una experiencia mágica. ¿Lista para sorprender? Contáctanos y diseñemos juntas la tarta perfecta.' },
    { img: '2.jpeg', video: '2.mp4', title: 'Tarta Elegante de Chocolate y Flores', desc: 'Una obra maestra de repostería que combina la elegancia clásica con toques modernos. Esta tarta de múltiples capas presenta un delicado trabajo de flores de azúcar hechas a mano y un acabado en chocolate premium que derrite los sentidos. Ideal para bodas íntimas, aniversarios especiales o celebraciones de cumpleaños sofisticadas. El interior esconde capas de bizcocho húmedo de chocolate belga y crema de frambuesa, creando una experiencia de sabor inolvidable. Cada detalle es meticulosamente elaborado para garantizar que tu evento sea verdaderamente único.' },
    { img: '3.jpeg', video: '3.mp4', title: 'Tarta Temática de Unicornio - Fantasía Dulce', desc: 'Déjate llevar a un mundo mágico con esta espectacular tarta de unicornio. Diseñada con colores pastel vibrantes, crines de merengue esponjoso y detalles dorados comestibles, esta creación es perfecta para cumpleaños infantiles llenos de fantasía. El cuerno brillante y las orejas delicadas están hechos completamente de fondant modelado a mano. Disponible en sabores de vainilla, fresa o chocolate, esta tarta no solo impresiona visualmente sino que también deleita el paladar. Personalizable con el nombre y la edad de la celebrante.' },
    { img: '4.jpeg', video: '4.mp4', title: 'Tarta de Boda Clásica con Flores Naturales', desc: 'La elegancia atemporal define esta impresionante tarta de boda de tres pisos. Decorada con flores naturales frescas cuidadosamente seleccionadas y un delicado trabajo de royal icing, esta creación es el centro de atención perfecto para tu día especial. El diseño minimalista pero sofisticado se adapta a cualquier estilo de boda, desde bodas en jardín hasta celebraciones de salón elegantes. Cada piso puede tener un sabor diferente para complacer a todos tus invitados. Trabajamos contigo para personalizar cada detalle según tu visión.' },
    { img: '5.jpeg', video: '5.mp4', title: 'Tarta de Cumpleaños con Macarons Franceses', desc: 'Una explosión de color y sabor que combina la tradición de la tarta de cumpleaños con la sofisticación de los macarons franceses. Esta creación presenta una drip de chocolate artesanal, macarons de diferentes sabores cuidadosamente dispuestos y decoraciones de crema de mantequilla suiza. Perfecta para adolescentes y adultos que buscan algo elegante pero divertido. Los macarons pueden personalizarse en los colores y sabores de tu preferencia. Una obra de arte comestible que sorprenderá a todos tus invitados y creará recuerdos inolvidables.' },
    { img: '6.jpeg', video: '6.mp4', title: 'Tarta Boho Chic para Bodas al Aire Libre', desc: 'Inspirada en la naturaleza y el estilo bohemio, esta tarta es perfecta para bodas rústicas o al aire libre. El acabado semi-naked deja ver las capas del bizcocho, mientras que las flores comestibles y las decoraciones de hojas de oro dan un toque de elegancia natural. Cada elemento está diseñado para complementar tu celebración al aire libre. Disponible en sabores como vainilla-lavanda, limón-romero o chocolate-naranja. Esta tarta no solo es hermosa sino también deliciosa, utilizando ingredientes frescos y de calidad premium.' },
    { img: '7.jpeg', video: '7.mp4', title: 'Tarta de Princesa Disney Personalizada', desc: 'Haz realidad los sueños de tu pequeña con esta tarta inspirada en princesas Disney. Cada detalle está meticulosamente diseñado para capturar la magia de sus personajes favoritos. Desde tiaras comestibles hasta vestidos de fondant trabajados a mano, esta creación es verdaderamente espectacular. Podemos personalizar la tarta con la princesa favorita de tu hija: Elsa, Bella, Ariel o cualquier otra. El interior puede ser de vainilla, fresa o chocolate, decorado con rellenos de crema y frutas frescas. Una tarta que hará brillar sus ojos de emoción.' },
    { img: '8.jpeg', video: '8.mp4', title: 'Tarta Minimalista Moderna - Elegancia Pura', desc: 'Para aquellos que aprecian la belleza en la simplicidad, esta tarta minimalista moderna es la elección perfecta. Con líneas limpias, colores neutros sofisticados y decoraciones geométricas sutiles, esta creación es ideal para bodas contemporáneas, aniversarios elegantes o eventos corporativos. El acabado perfectamente liso requiere horas de trabajo experto. A pesar de su apariencia simple, cada detalle está cuidadosamente planificado. Disponible en sabores gourmet como vainilla-cardamomo, chocolate-sal marina o pistacho-frambuesa.' },
    { img: '9.jpeg', video: '9.mp4', title: 'Tarta Arcoíris de Cumpleaños - Alegría Colorida', desc: 'Una explosión de color y felicidad que hace que cada cumpleaños sea más especial. Esta tarta arcoíris presenta capas de bizcocho de colores vibrantes, crema de mantequilla esponjosa y decoraciones que hacen sonreír a todos. Perfecta para cumpleaños infantiles llenos de energía y alegría. Cuando se corta, revela las hermosas capas de colores que sorprenden y deleitan. Podemos personalizar con el nombre, edad y topper especial. Los sabores pueden variar desde vainilla clásica hasta combinaciones más aventureras. ¡Una fiesta en cada bocado!' },
    { img: '10.jpeg', video: '10.mp4', title: 'Tarta de Comunión con Cruz Elegante', desc: 'Celebra este momento sagrado con una tarta diseñada especialmente para primeras comuniones. Decorada con símbolos religiosos delicados, flores blancas puras y detalles en dorado o plateado, esta creación refleja la importancia del evento. El diseño puede personalizarse con el nombre del niño o niña y la fecha de la celebración. Utilizamos ingredientes de la más alta calidad para crear un sabor tan memorable como la ocasión. Disponible en diferentes tamaños para acomodar desde reuniones íntimas hasta grandes celebraciones familiares.' },
    { img: '11.jpeg', video: '11.mp4', title: 'Tarta de Fútbol para Fanáticos del Deporte', desc: 'Para el amante del fútbol, esta tarta temática captura toda la emoción del deporte. Diseñada como un campo de fútbol completo o con el escudo de su equipo favorito, cada detalle es trabajado con precisión. Podemos personalizar con los colores del equipo, número de jugador y nombre. El balón de fútbol comestible en la parte superior es completamente realista. Perfecta para cumpleaños de niños, adolescentes y adultos apasionados por el fútbol. Una celebración que combina dos pasiones: el fútbol y el dulce sabor del éxito.' },
    { img: '12.jpeg', video: '12.mp4', title: 'Tarta Vintage con Encaje Comestible', desc: 'La nostalgia y la elegancia se encuentran en esta hermosa tarta vintage. El encaje comestible hecho a mano, las flores de azúcar en tonos pastel y los detalles de perlas crean una estética romántica perfecta para bodas vintage, té de la tarde elegante o aniversarios especiales. Cada pieza de encaje es cuidadosamente aplicada para crear un efecto tridimensional impresionante. Los sabores clásicos como vainilla-fresas con crema o limón-lavanda complementan perfectamente el estilo vintage. Una tarta que transporta a otra época.' },
    { img: '13.jpeg', video: '13.mp4', title: 'Tarta de Dinosaurios - Aventura Prehistórica', desc: 'Viaja millones de años atrás con esta emocionante tarta de dinosaurios. Perfecta para pequeños paleontólogos, presenta dinosaurios modelados a mano, volcanes en erupción de chocolate y vegetación comestible. El escenario prehistórico está lleno de detalles que fascinarán a los niños. Podemos incluir el dinosaurio favorito del cumpleañero: T-Rex, Triceratops, Velociraptor y más. El interior esconde deliciosas capas de bizcocho y rellenos que harán rugir de felicidad. Una aventura dulce que nunca olvidarán.' },
    { img: '14.jpeg', video: '14.mp4', title: 'Tarta de Quinceañera Rosa y Dorado', desc: 'Celebra este momento único en la vida de una joven con una tarta tan especial como ella. Esta elegante creación combina tonos rosa suave con detalles dorados brillantes, perfectos para una quinceañera moderna. Las flores de azúcar, la corona decorativa y los detalles en fondant reflejan la transición a la adultez con gracia y estilo. Disponible en múltiples pisos para eventos grandes. Podemos personalizar completamente el diseño para que coincida con el tema y los colores de la celebración. Un dulce comienzo para una nueva etapa.' },
    { img: '15.jpeg', video: '15.mp4', title: 'Tarta de Superhéroes - Poder y Dulzura', desc: 'Para el pequeño héroe de la casa, esta tarta de superhéroes trae toda la acción y emoción. Ya sea Spiderman, Batman, Los Vengadores o cualquier otro superhéroe favorito, creamos diseños dinámicos que capturan la esencia del personaje. Los colores vibrantes, los logos icónicos y las figuras modeladas a mano hacen que esta tarta sea el centro de atención de cualquier fiesta. Disponible en diferentes tamaños y sabores. ¡Una tarta con superpoderes de sabor que salvará el día de cualquier cumpleaños!' },
    { img: '16.jpeg', video: '16.mp4', title: 'Tarta Rústica con Frutas Frescas', desc: 'La belleza de lo natural se celebra en esta tarta rústica decorada con frutas frescas de temporada. El estilo semi-naked permite apreciar las capas del bizcocho mientras que las frutas aportan color, frescura y un toque saludable. Perfecta para bodas campestres, celebraciones de verano o cualquier evento que busque una estética natural y elegante. Utilizamos solo frutas frescas seleccionadas en su punto óptimo de maduración. Los sabores son ligeros y refrescantes, ideales para climas cálidos. Una celebración de la naturaleza en cada bocado.' },
    { img: '17.jpeg', video: '17.mp4', title: 'Tarta de Baby Shower - Dulce Espera', desc: 'Celebra la llegada del nuevo bebé con esta adorable tarta de baby shower. Disponible en rosa para niña, azul para niño o colores neutros si es una sorpresa. Decorada con elementos tiernos como patucos, chupetes, bloques de bebé y ositos, todo elaborado en fondant comestible. El diseño puede personalizarse con el nombre del bebé si ya se conoce. Sabores suaves y delicados perfectos para esta celebración especial. Una tarta que endulza la espera y crea recuerdos hermosos de este momento único.' },
    { img: '18.jpeg', video: '18.mp4', title: 'Tarta de Graduación - Éxito Académico', desc: 'Brinda por los logros académicos con esta tarta diseñada para celebrar graduaciones. Decorada con birretes, diplomas enrollados, libros y los colores de la institución educativa, esta creación honra el esfuerzo y dedicación del graduado. Podemos personalizar con el nombre, año de graduación y carrera. Disponible para graduaciones de secundaria, universidad o posgrado. Los sabores sofisticados reflejan la madurez y el éxito alcanzado. ¡Una dulce forma de celebrar el fin de una etapa y el comienzo de nuevas aventuras!' },
    { img: '19.jpeg', video: '19.mp4', title: 'Tarta Drip de Oreo y Chocolate', desc: 'Una tentación irresistible para los amantes del chocolate y las galletas Oreo. Esta espectacular tarta presenta un drip de chocolate brillante, galletas Oreo enteras y trituradas, y decoraciones de crema de mantequilla perfectamente ejecutadas. El contraste entre el chocolate oscuro y la crema blanca crea un impacto visual impresionante. Perfecta para cumpleaños de adolescentes y adultos que buscan algo indulgente y delicioso. Cada bocado es una explosión de sabor a chocolate y galleta. ¡Advertencia: puede causar adicción dulce!' },
    { img: '20.jpeg', video: '20.mp4', title: 'Tarta Floral Primaveral - Jardín Comestible', desc: 'La primavera cobra vida en esta hermosa tarta decorada con un jardín de flores comestibles. Cada pétalo está delicadamente elaborado en azúcar, creando rosas, peonías, dalias y más flores realistas. Los tonos pastel y las hojas verdes crean una composición natural y elegante. Perfecta para bodas primaverales, cumpleaños elegantes o celebraciones de aniversario. El diseño puede adaptarse a tus flores favoritas o a las flores de temporada disponibles. Un jardín secreto de sabor y belleza que florecerá en tu celebración.' },
    { img: '21.jpeg', video: '21.mp4', title: 'Tarta de Sirena - Bajo el Mar', desc: 'Sumérgete en un mundo submarino mágico con esta encantadora tarta de sirena. Diseñada con escalas brillantes comestibles, conchas de azúcar, estrellas de mar y una cola de sirena espectacular, esta creación es perfecta para pequeñas soñadoras. Los tonos de azul, turquesa y púrpura evocan las profundidades del océano. Podemos personalizar con el nombre de la cumpleañera y su edad. Los sabores pueden incluir combinaciones refrescantes como coco-piña o vainilla-frambuesa azul. ¡Una aventura submarina deliciosa!' },
    { img: '22.jpeg', video: '22.mp4', title: 'Tarta de Aniversario con Números Dorados', desc: 'Celebra años de amor y compromiso con esta elegante tarta de aniversario. Los números dorados en la parte superior indican los años juntos, mientras que las decoraciones florales y los detalles sofisticados reflejan la madurez de la relación. Perfecta para bodas de plata, oro o cualquier aniversario significativo. El diseño puede ser romántico y clásico o moderno y minimalista según tu preferencia. Sabores gourmet que han resistido el paso del tiempo. Una tarta que honra el amor duradero y crea nuevos recuerdos dulces.' },
    { img: '23.jpeg', video: '23.mp4', title: 'Tarta de Cactus y Suculentas - Desierto Dulce', desc: 'Para los amantes de las plantas y el estilo boho, esta tarta decorada con cactus y suculentas comestibles es única y adorable. Cada planta está meticulosamente modelada en fondant con detalles realistas como espinas (no punzantes), flores y diferentes tonos de verde. Perfecta para cumpleaños de adultos con estilo único o baby showers con temática de cactus. El diseño es moderno, fresco y diferente a cualquier otra tarta tradicional. Una forma dulce de celebrar sin necesitar regar las plantas después.' },
    { img: '24.jpeg', video: '24.mp4', title: 'Tarta de Construcción - Diversión con Sabor', desc: 'Para el pequeño constructor, esta tarta temática trae toda la diversión de las obras. Completa con camiones de volteo, excavadoras, conos de tráfico y tierra comestible (migas de galleta), esta creación es perfecta para niños fascinados por los vehículos de construcción. Podemos incluir el nombre del cumpleañero en letreros de obra. El diseño es colorido, divertido y comestible en su totalidad. Sabores que construyen sonrisas y recuerdos. ¡Atención: zona de celebración en construcción!' },
    { img: '25.jpeg', video: '25.mp4', title: 'Tarta Elegante de Oro y Blanco - Sofisticación Pura', desc: 'La sofisticación alcanza su máxima expresión en esta tarta de oro y blanco. Con detalles de hoja de oro comestible, perlas de azúcar y un acabado inmaculadamente liso, esta creación es perfecta para eventos de alto nivel: bodas de lujo, galas, eventos corporativos importantes o aniversarios significativos. El contraste entre el blanco puro y los acentos dorados crea un impacto visual inolvidable. Disponible en sabores premium que complementan la elegancia del diseño. Una tarta digna de la realeza.' }
];

function initCakeSlider() {
    const slider = document.getElementById('cake-slider');
    const dotsContainer = document.getElementById('slider-dots');
    const sliderContainer = document.querySelector('.cake-slider-container');
    if (!slider || !dotsContainer) return;

    // Render cake cards
    cakesData.forEach((cake, index) => {
        const card = document.createElement('div');
        card.className = 'cake-card';
        card.innerHTML = `<img src="IMG/${cake.img}" alt="${cake.title}" loading="lazy">`;
        card.addEventListener('click', () => openCakeModal(index));
        slider.appendChild(card);
    });

    // Create navigation dots - calcular para que siempre muestre 4 tartas completas
    // Si tengo 25 tartas y muestro 4 a la vez, el máximo es 22 posiciones (25 - 4 + 1)
    const dotsNeeded = Math.max(1, cakesData.length - 3);
    for (let i = 0; i < dotsNeeded; i++) {
        const dot = document.createElement('span');
        dot.className = 'slider-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToCakeSlide(i));
        dotsContainer.appendChild(dot);
    }

    // Auto-advance every 15 seconds
    cakeSliderInterval = setInterval(() => {
        moveCakeSlider();
    }, 15000);

    // Pause on hover, resume on mouse leave
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            if (cakeSliderInterval) {
                clearInterval(cakeSliderInterval);
                cakeSliderInterval = null;
            }
        });

        sliderContainer.addEventListener('mouseleave', () => {
            if (!cakeSliderInterval) {
                cakeSliderInterval = setInterval(() => {
                    moveCakeSlider();
                }, 15000);
            }
        });
    }
}

function goToCakeSlide(index) {
    const slider = document.getElementById('cake-slider');
    const dotsContainer = document.getElementById('slider-dots');
    if (!slider || !dotsContainer) return;

    const cardWidth = slider.querySelector('.cake-card').offsetWidth;
    const gap = 16;
    const moveDistance = cardWidth + gap;

    currentCakeSlide = index;

    // Loop back to start if at the end
    const dotsNeeded = Math.max(1, cakesData.length - 3);
    if (currentCakeSlide >= dotsNeeded) {
        currentCakeSlide = 0;
    } else if (currentCakeSlide < 0) {
        currentCakeSlide = dotsNeeded - 1;
    }

    // Mover de 1 en 1, no de 4 en 4
    slider.style.transform = `translateX(-${currentCakeSlide * moveDistance}px)`;

    // Update dots
    const dots = dotsContainer.querySelectorAll('.slider-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentCakeSlide);
    });
}

function moveCakeSlider() {
    const slider = document.getElementById('cake-slider');
    const dotsContainer = document.getElementById('slider-dots');
    if (!slider || !dotsContainer) return;

    const cardWidth = slider.querySelector('.cake-card').offsetWidth;
    const gap = 16;
    const moveDistance = cardWidth + gap;

    const dotsNeeded = Math.max(1, cakesData.length - 3);
    currentCakeSlide++;

    // Loop back to start when reaching the end
    if (currentCakeSlide >= dotsNeeded) {
        currentCakeSlide = 0;
    }

    // Mover de 1 en 1, no de 4 en 4
    slider.style.transform = `translateX(-${currentCakeSlide * moveDistance}px)`;

    // Update dots
    const dots = dotsContainer.querySelectorAll('.slider-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentCakeSlide);
    });
}

function openCakeModal(index) {
    const cake = cakesData[index];
    const modal = document.getElementById('cake-modal');
    if (!modal) return;

    const videoElement = modal.querySelector('#cake-video');
    const titleElement = modal.querySelector('#cake-title');
    const descElement = modal.querySelector('#cake-description');

    if (videoElement) {
        videoElement.src = `Videos/${cake.video}`;
        videoElement.muted = true; // Silenciar el video
    }
    if (titleElement) titleElement.textContent = cake.title;
    if (descElement) descElement.textContent = cake.desc;

    modal.classList.add('active');
    document.body.classList.add('modal-open');

    if (videoElement) {
        videoElement.load();
        videoElement.play().catch(e => console.log('Video play error:', e));
    }
}

function closeCakeModal() {
    const modal = document.getElementById('cake-modal');
    if (!modal) return;

    const videoElement = modal.querySelector('#cake-video');
    if (videoElement) {
        videoElement.pause();
        videoElement.src = '';
    }

    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

// ========== Testimonials System ==========
const testimonials = [
    { name: 'María García', rating: 5, text: '¡La tarta de boda fue espectacular! Todos nuestros invitados quedaron impresionados. Sabor increíble y diseño perfecto. 💕', event: 'Boda' },
    { name: 'Carlos Rodríguez', rating: 5, text: 'Pedimos una tarta de cumpleaños para mi hija y fue mágica. ¡No paraba de sonreír! Gracias por hacer su día especial. 🎂', event: 'Cumpleaños' },
    { name: 'Ana López', rating: 5, text: 'Profesionalidad y calidad excepcionales. La tarta de comunión de mi hijo superó todas las expectativas. ¡Altamente recomendado! ⭐', event: 'Comunión' },
    { name: 'Pedro Martínez', rating: 5, text: 'Sabor delicioso y presentación impecable. La mejor tarta que hemos probado. ¡Volveremos sin duda! 🍰', event: 'Aniversario' },
    { name: 'Lucía Fernández', rating: 5, text: 'Mi tarta de quinceañera fue un sueño hecho realidad. Cada detalle perfecto. ¡Gracias por tanto! 👑', event: 'Quinceañera' },
    { name: 'Miguel Sánchez', rating: 5, text: 'Excelente servicio y atención personalizada. La tarta de empresa fue todo un éxito. Muy profesionales. 🏆', event: 'Evento Corporativo' },
    { name: 'Isabel Torres', rating: 5, text: 'La tarta más hermosa que he visto. Y el sabor... ¡increíble! Definitivamente mi repostería favorita. 💖', event: 'Baby Shower' },
    { name: 'Javier Ruiz', rating: 5, text: '¡Qué sorpresa tan maravillosa! La tarta de aniversario dejó a mi esposa sin palabras. Muchas gracias. 🌹', event: 'Aniversario' },
    { name: 'Carmen Morales', rating: 5, text: 'Calidad artesanal incomparable. Cada bocado es una experiencia. ¡Los recomiendo al 100%! ✨', event: 'Cumpleaños' },
    { name: 'David Jiménez', rating: 5, text: 'La tarta de graduación de mi hijo fue perfecta. Diseño personalizado y sabor extraordinario. 🎓', event: 'Graduación' },
    { name: 'Laura Castro', rating: 5, text: 'Nunca había visto una tarta tan bonita. Y encima, deliciosa. ¡Arte comestible de verdad! 🎨', event: 'Boda' },
    { name: 'Roberto Ortiz', rating: 5, text: 'Excelente relación calidad-precio. La tarta superó nuestras expectativas. ¡Volveremos pronto! 👍', event: 'Cumpleaños' },
    { name: 'Patricia Ramírez', rating: 5, text: 'Mi hija no podía creer que su tarta de princesa fuera real. ¡Lloró de emoción! Gracias infinitas. 👸', event: 'Cumpleaños' },
    { name: 'Fernando Gil', rating: 5, text: 'Profesionalidad y creatividad en cada detalle. La mejor elección para nuestra boda. Perfecto. 💍', event: 'Boda' },
    { name: 'Sofía Vargas', rating: 5, text: 'Sabores únicos y presentación de lujo. Una experiencia gastronómica inolvidable. ¡Maravilloso! 🌟', event: 'Evento Especial' },
    { name: 'Antonio Herrera', rating: 5, text: 'La tarta de fútbol para mi hijo fue el mejor regalo. ¡Hasta parecía un estadio! Genial. ⚽', event: 'Cumpleaños' },
    { name: 'Elena Navarro', rating: 5, text: 'Atención personalizada y resultado espectacular. La tarta de comunión fue preciosa. Gracias. 🕊️', event: 'Comunión' },
    { name: 'Jorge Romero', rating: 5, text: 'Increíble trabajo artesanal. Cada detalle cuidado al máximo. ¡La mejor repostería de Segovia! 🏅', event: 'Aniversario' },
    { name: 'Mónica Serrano', rating: 5, text: 'Mi tarta de baby shower fue adorable. Todos preguntaban dónde la habíamos comprado. ¡Perfecta! 👶', event: 'Baby Shower' },
    { name: 'Ricardo Blanco', rating: 5, text: 'Sabor excepcional y diseño impresionante. Una combinación ganadora. ¡Totalmente recomendable! 🎪', event: 'Cumpleaños' },
    { name: 'Teresa Mendoza', rating: 5, text: 'La tarta más rica que he probado en mi vida. Y la presentación, de película. ¡Enhorabuena! 🎬', event: 'Boda' },
    { name: 'Sergio Delgado', rating: 5, text: 'Creatividad sin límites. Hicieron realidad nuestra idea más loca. ¡Resultado fantástico! 🚀', event: 'Evento Especial' },
    { name: 'Cristina Ramos', rating: 5, text: 'Mi hija quedó encantada con su tarta de unicornio. Colores preciosos y sabor delicioso. 🦄', event: 'Cumpleaños' },
    { name: 'Manuel Fuentes', rating: 5, text: 'Profesionales de primer nivel. La tarta de empresa causó sensación. Muy contentos. 💼', event: 'Evento Corporativo' },
    { name: 'Raquel Molina', rating: 5, text: 'Detalles exquisitos y sabor memorable. Superaron todas nuestras expectativas. ¡Gracias! 💝', event: 'Aniversario' },
    { name: 'Alberto Vega', rating: 5, text: 'La tarta de dinosaurios para mi hijo fue épica. ¡No quería que se acabara! Geniales. 🦕', event: 'Cumpleaños' },
    { name: 'Beatriz Cruz', rating: 5, text: 'Elegancia y buen gusto en cada elemento. La tarta de boda fue simplemente perfecta. 🥂', event: 'Boda' },
    { name: 'Francisco Reyes', rating: 5, text: 'Tarta de graduación impecable. Diseño personalizado y sabor de 10. ¡Muchas gracias! 📚', event: 'Graduación' },
    { name: 'Natalia Iglesias', rating: 5, text: 'Sabores innovadores y presentación artística. Una experiencia sensorial completa. ¡Maravillosa! 🎭', event: 'Evento Especial' },
    { name: 'Óscar Prieto', rating: 5, text: 'La tarta de superhéroes dejó a todos boquiabiertos. Mi hijo está feliz. ¡Sois los mejores! 🦸', event: 'Cumpleaños' },
    { name: 'Andrea Santos', rating: 5, text: 'Calidad premium en cada detalle. La tarta de quinceañera fue de ensueño. Gracias infinitas. ✨', event: 'Quinceañera' },
    { name: 'Pablo Cabrera', rating: 5, text: 'Excelente trabajo y trato cercano. La tarta de aniversario nos encantó. ¡Recomendadísimo! 🎉', event: 'Aniversario' },
    { name: 'Claudia Giménez', rating: 5, text: 'Mi baby shower fue mágico gracias a la tarta. Diseño tierno y sabor delicado. Perfecta. 🍼', event: 'Baby Shower' },
    { name: 'Rubén Méndez', rating: 5, text: 'La tarta de boda cumplió todos nuestros sueños. Elegante, rica y espectacular. ¡Bravo! 👰', event: 'Boda' },
    { name: 'Silvia Cortés', rating: 5, text: 'Increíble atención al detalle. La tarta de cumpleaños fue una obra de arte comestible. 🖼️', event: 'Cumpleaños' },
    { name: 'Tomás Aguilar', rating: 5, text: 'Sabor extraordinario y presentación de lujo. La mejor elección para nuestro evento. ¡Top! 🔝', event: 'Evento Especial' },
    { name: 'Verónica Lozano', rating: 5, text: 'La tarta de sirena para mi hija fue mágica. Colores preciosos y sabor increíble. 🧜‍♀️', event: 'Cumpleaños' },
    { name: 'Daniel Pascual', rating: 5, text: 'Profesionalidad máxima. La tarta corporativa fue todo un éxito. Muy recomendables. 🏢', event: 'Evento Corporativo' },
    { name: 'Gloria Marín', rating: 5, text: 'Nunca olvidaremos nuestra tarta de boda. Fue el centro de todas las miradas. Maravillosa. 💐', event: 'Boda' },
    { name: 'Héctor Domínguez', rating: 5, text: 'La tarta de construcción para mi hijo fue espectacular. ¡Hasta los adultos alucinaron! 🚧', event: 'Cumpleaños' },
    { name: 'Irene Campos', rating: 5, text: 'Sabores auténticos y diseño impresionante. La tarta de comunión fue preciosa. Gracias. 🌸', event: 'Comunión' },
    { name: 'Julián Peña', rating: 5, text: 'Calidad artesanal de verdad. Cada bocado es un placer. ¡La mejor repostería! 🍰', event: 'Aniversario' },
    { name: 'Lorena Carrasco', rating: 5, text: 'Mi quinceañera fue perfecta gracias a la tarta. Diseño de ensueño y sabor delicioso. 💫', event: 'Quinceañera' },
    { name: 'Marcos Vidal', rating: 5, text: 'La tarta de aniversario sorprendió a mi esposa. Romántica, elegante y riquísima. ¡Gracias! 💞', event: 'Aniversario' },
    { name: 'Nuria León', rating: 5, text: 'Creatividad desbordante. Hicieron de nuestra idea algo aún mejor. ¡Resultado espectacular! 🌈', event: 'Evento Especial' },
    { name: 'Ángel Rubio', rating: 5, text: 'La tarta de fútbol fue el sueño de mi hijo hecho realidad. ¡Parecía un campo de verdad! ⚽', event: 'Cumpleaños' },
    { name: 'Pilar Moreno', rating: 5, text: 'Elegancia y sofisticación en cada detalle. La tarta de boda fue simplemente perfecta. 👰‍♀️', event: 'Boda' },
    { name: 'Ramón Guerrero', rating: 5, text: 'Sabor exquisito y presentación de museo. Una experiencia gastronómica única. ¡Bravo! 🎨', event: 'Evento Especial' },
    { name: 'Sandra Ortega', rating: 5, text: 'La tarta de princesa hizo llorar de emoción a mi hija. ¡Momentos que no tienen precio! 👑', event: 'Cumpleaños' },
    { name: 'Vicente Nieto', rating: 5, text: 'Profesionales excepcionales. La tarta de graduación fue perfecta en todo sentido. ¡Gracias! 🎓', event: 'Graduación' },
    { name: 'Yolanda Ferrer', rating: 5, text: 'Mi baby shower fue adorable gracias a la tarta. Diseño tierno y sabor suave. Perfecta. 🎀', event: 'Baby Shower' },
    { name: 'Adrián Soto', rating: 5, text: 'Increíble trabajo artesanal. La tarta de boda dejó a todos sin palabras. ¡Espectacular! 💒', event: 'Boda' },
    { name: 'Belén Hidalgo', rating: 5, text: 'Sabores únicos y presentación impecable. La mejor tarta de cumpleaños que he visto. 🎈', event: 'Cumpleaños' },
    { name: 'César Carmona', rating: 5, text: 'la tarta corporativa causó gran impresión. Profesionalidad y calidad al 100%. ¡Top! 🌟', event: 'Evento Corporativo' },
    { name: 'Dolores Garrido', rating: 5, text: 'La tarta de comunión de mi nieto fue preciosa. Detalles delicados y sabor maravilloso. 🕊️', event: 'Comunión' },
    { name: 'Emilio Castillo', rating: 5, text: 'Nuestra tarta de aniversario fue romántica y deliciosa. ¡Gracias por tanto cariño! 💕', event: 'Aniversario' },
    { name: 'Fátima Benítez', rating: 5, text: 'La tarta de unicornio para mi hija fue mágica. Colores vibrantes y sabor espectacular. 🦄', event: 'Cumpleaños' },
    { name: 'Gonzalo Paredes', rating: 5, text: 'Excelente servicio de principio a fin. La tarta de boda superó expectativas. ¡Perfecta! 💍', event: 'Boda' },
    { name: 'Helena Núñez', rating: 5, text: 'Sabor auténtico y diseño de alta costura. Una experiencia dulce inolvidable. ¡Genial! 👗', event: 'Quinceañera' },
    { name: 'Ignacio Montero', rating: 5, text: 'La tarta de dinosaurios dejó a mi hijo sin habla. ¡Parecían de verdad! Increíbles. 🦖', event: 'Cumpleaños' },
    { name: 'Julia Crespo', rating: 5, text: 'Mi evento fue perfecto gracias a la tarta. Elegancia y sabor en cada bocado. Gracias. ✨', event: 'Evento Especial' },
    { name: 'Lucas Gallego', rating: 5, text: 'La tarta de graduación me encantó. Diseño personalizado y sabor de campeonato. ¡Gracias! 🏆', event: 'Graduación' },
    { name: 'Marina Calvo', rating: 5, text: 'Atención excepcional y resultado maravilloso. La tarta de boda fue de ensueño. 💐', event: 'Boda' },
    { name: 'Nicolás Rojas', rating: 5, text: 'Sabor increíble y presentación de película. La mejor tarta de aniversario posible. 🎬', event: 'Aniversario' },
    { name: 'Olga Durán', rating: 5, text: 'La tarta de baby shower fue adorable. Detalles tiernos y sabor delicado. ¡Perfecta! 👶', event: 'Baby Shower' },
    { name: 'Pablo Suárez', rating: 5, text: 'Profesionalidad y creatividad sin límites. La tarta de cumpleaños fue épica. ¡Bravo! 🎉', event: 'Cumpleaños' },
    { name: 'Quintina Bravo', rating: 5, text: 'Mi quinceañera tuvo la tarta más bonita. Diseño de princesa y sabor delicioso. 👸', event: 'Quinceañera' },
    { name: 'Rafael Soler', rating: 5, text: 'La tarta de boda fue el centro de atención. Elegante, rica y perfecta. ¡Gracias! 🥂', event: 'Boda' },
    { name: 'Susana Velasco', rating: 5, text: 'Sabores gourmet y presentación artística. Una experiencia sensorial única. ¡Maravillosa! 🎭', event: 'Evento Especial' },
    { name: 'Timoteo Muñoz', rating: 5, text: 'La tarta de superhéroes para mi hijo fue alucinante. ¡Diseño potente! Geniales. 💪', event: 'Cumpleaños' },
    { name: 'Úrsula Campos', rating: 5, text: 'Calidad premium y atención personalizada. La tarta de comunión fue hermosa. Gracias. 🌺', event: 'Comunión' },
    { name: 'Valentín Pascual', rating: 5, text: 'Nuestra tarta de aniversario fue romántica y deliciosa. ¡Momentos dulces! 💝', event: 'Aniversario' },
    { name: 'Wendy Flores', rating: 5, text: 'La tarta de sirena hizo realidad los sueños de mi hija. Colores mágicos. 🌊', event: 'Cumpleaños' },
    { name: 'Xavier Medina', rating: 5, text: 'Excelente trabajo para nuestro evento corporativo. Profesionalidad al máximo. ¡Top! 🏅', event: 'Evento Corporativo' },
    { name: 'Yaiza Prieto', rating: 5, text: 'La tarta de boda más hermosa que he visto. Y el sabor... ¡increíble! Perfecta. 💒', event: 'Boda' },
    { name: 'Zacarías León', rating: 5, text: 'Sabor extraordinario y diseño impecable. La tarta de cumpleaños fue fantástica. 🎂', event: 'Cumpleaños' },
    { name: 'Alba Gutiérrez', rating: 5, text: 'Mi baby shower fue especial gracias a la tarta. Diseño adorable y rico. ¡Gracias! 🍼', event: 'Baby Shower' },
    { name: 'Bruno Navarro', rating: 5, text: 'La tarta de construcción fue el hit de la fiesta. ¡Mi hijo no para de hablar de ella! 🚜', event: 'Cumpleaños' },
    { name: 'Carla Vega', rating: 5, text: 'Elegancia y buen gusto definen la tarta de mi quinceañera. Fue un sueño. 💫', event: 'Quinceañera' },
    { name: 'Diego Arias', rating: 5, text: 'Profesionales de confianza. La tarta de aniversario nos encantó. ¡Recomendables! 🎊', event: 'Aniversario' },
    { name: 'Emma Santana', rating: 5, text: 'Sabores auténticos y diseño de revista. La mejor tarta de boda. ¡Espectacular! 📸', event: 'Boda' },
    { name: 'Fabián Cruz', rating: 5, text: 'La tarta de fútbol fue perfecta. Mi hijo y sus amigos alucinaron. ¡Grandes! ⚽', event: 'Cumpleaños' },
    { name: 'Gema Serrano', rating: 5, text: 'Creatividad y calidad en cada detalle. La tarta de comunión fue preciosa. 🌸', event: 'Comunión' },
    { name: 'Hugo Ibáñez', rating: 5, text: 'Sabor excepcional y presentación de lujo. La tarta de evento fue perfecta. ¡Bravo! 🌟', event: 'Evento Especial' },
    { name: 'Inés Hernández', rating: 5, text: 'La tarta de princesa hizo feliz a mi hija. ¡No paraba de sonreír! Maravillosa. 👑', event: 'Cumpleaños' },
    { name: 'Jaime Losada', rating: 5, text: 'Nuestra tarta de graduación fue impecable. Diseño único y sabor increíble. 🎓', event: 'Graduación' },
    { name: 'Kira Molina', rating: 5, text: 'El baby shower perfecto con la tarta perfecta. Detalles tiernos y rico. ¡Gracias! 👼', event: 'Baby Shower' },
    { name: 'Leonardo Parra', rating: 5, text: 'La tarta de boda cumplió todos nuestros sueños. Elegante y deliciosa. Perfecta. 💒', event: 'Boda' },
    { name: 'Marta Redondo', rating: 5, text: 'Sabores innovadores y presentación artística. Una experiencia única. ¡Geniales! 🎨', event: 'Evento Especial' },
    { name: 'Néstor Delgado', rating: 5, text: 'La tarta de dinosaurios fue épica. Mi hijo dice que sois magos. ¡Increíbles! 🦕', event: 'Cumpleaños' },
    { name: 'Olivia Martos', rating: 5, text: 'Mi quinceañera fue de cuento gracias a la tarta. Diseño de ensueño. ✨', event: 'Quinceañera' },
    { name: 'Pedro Román', rating: 5, text: 'La tarta de aniversario sorprendió a todos. Romántica, rica y hermosa. ¡Gracias! 💞', event: 'Aniversario' },
    { name: 'Rocío Sanz', rating: 5, text: 'Profesionalidad y calidad excepcionales. La tarta corporativa fue un éxito total. 🏆', event: 'Evento Corporativo' },
    { name: 'Samuel Torres', rating: 5, text: 'La tarta de superhéroes dejó a mi hijo sin palabras. ¡Diseño potente! Geniales. 🦸‍♂️', event: 'Cumpleaños' },
    { name: 'Tamara Gil', rating: 5, text: 'Sabor delicado y diseño hermoso. La tarta de comunión fue perfecta. Gracias. 🕊️', event: 'Comunión' },
    { name: 'Ulises Campos', rating: 5, text: 'Nuestra tarta de boda fue simplemente perfecta. Elegante, rica y hermosa. 💍', event: 'Boda' },
    { name: 'Valeria Ruiz', rating: 5, text: 'La tarta de unicornio hizo realidad los sueños de mi hija. ¡Colores mágicos! 🦄', event: 'Cumpleaños' },
    { name: 'Walter Díaz', rating: 5, text: 'Excelente trabajo y trato cercano. La tarta de aniversario nos encantó. ¡Top! 🎉', event: 'Aniversario' },
    { name: 'Ximena Santos', rating: 5, text: 'Mi baby shower fue mágico gracias a la tarta. Adorable en todos los sentidos. 👶', event: 'Baby Shower' },
    { name: 'Yeray Mora', rating: 5, text: 'La tarta de graduación fue impresionante. Diseño personalizado y sabor de 10. 📚', event: 'Graduación' },
    { name: 'Zoe Jiménez', rating: 5, text: 'Sabores gourmet y presentación de revista. La mejor tarta de boda. ¡Perfecta! 💐', event: 'Boda' }
];

let currentTestimonialIndex = 0;
let testimonialInterval;

function initTestimonials() {
    showRandomTestimonial();
    testimonialInterval = setInterval(() => {
        showRandomTestimonial();
    }, 35000); // Show every 35 seconds (10s display + 25s wait)
}

function showRandomTestimonial() {
    // Remove any existing testimonial
    const existing = document.querySelector('.testimonial-popup');
    if (existing) {
        existing.classList.remove('show');
        setTimeout(() => existing.remove(), 400);
    }

    // Wait a bit before showing new one
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * testimonials.length);
        const testimonial = testimonials[randomIndex];

        const popup = document.createElement('div');
        popup.className = 'testimonial-popup';
        popup.innerHTML = `
            <div class="testimonial-header">
                <span class="testimonial-name">${testimonial.name}</span>
                <button class="testimonial-close" onclick="closeTestimonial(this)">×</button>
            </div>
            <div class="testimonial-rating">${'⭐'.repeat(testimonial.rating)}</div>
            <p class="testimonial-text">${testimonial.text}</p>
            <div class="testimonial-event">${testimonial.event}</div>
        `;

        document.body.appendChild(popup);

        // Trigger animation
        setTimeout(() => popup.classList.add('show'), 100);

        // Auto-hide after 10 seconds
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 400);
        }, 10000);
    }, 500);
}

function closeTestimonial(button) {
    const popup = button.closest('.testimonial-popup');
    if (popup) {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 400);
    }
}

// ========== WhatsApp Pre-Message Popup ==========
function initWhatsAppButton() {
    const whatsappBtn = document.querySelector('.floating-whatsapp');
    if (!whatsappBtn) return;

    whatsappBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showWhatsAppPopup();
    });
}

function showWhatsAppPopup() {
    const popup = document.getElementById('whatsapp-popup');
    const overlay = document.getElementById('whatsapp-overlay');

    if (popup && overlay) {
        overlay.classList.add('active');
        popup.classList.add('active');
        document.body.classList.add('modal-open');
    }
}

function closeWhatsAppPopup() {
    const popup = document.getElementById('whatsapp-popup');
    const overlay = document.getElementById('whatsapp-overlay');

    if (popup && overlay) {
        popup.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
}

function continueToWhatsApp() {
    window.open('https://wa.link/ixpf52', '_blank');
    closeWhatsAppPopup();
}

// ========== Scroll-to-Top Button ==========
function initScrollTopButton() {
    const scrollBtn = document.getElementById('scroll-top-btn');
    if (!scrollBtn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== Legal Modals ==========
function openLegalModal(type) {
    const modal = document.getElementById(`legal-${type}`);
    if (modal) {
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }
}

function closeLegalModal(type) {
    const modal = document.getElementById(`legal-${type}`);
    if (modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
}

// ========== Smooth Scroll for Anchor Links ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========== Mobile Menu Toggle ==========
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// ========== Initialize Everything ==========
document.addEventListener('DOMContentLoaded', () => {
    initVideoSlider();
    initSpecialtyModals();
    initCakeSlider();
    initTestimonials();
    initWhatsAppButton();
    initScrollTopButton();
    initSmoothScroll();

    console.log('DulcesSiSaFashion initialized successfully! 🎂');
});
