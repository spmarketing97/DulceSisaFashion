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

    // Auto-advance every 7 seconds
    videoSliderInterval = setInterval(() => {
        nextVideoSlide();
    }, 7000);
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

    // Hide all slides, show active
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

    // Ambient background color: read data-bg from active slide
    const heroSection = document.getElementById('hero');
    const activeBg = videoSlides[currentVideoSlide].dataset.bg;
    if (heroSection && activeBg) {
        heroSection.style.background = activeBg;
    }
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
    {
        img: '1.jpeg', video: '1.mp4',
        title: '🌸 Tarta Princesa Rosa - Magia de Vainilla con Purpurina',
        desc: 'Una tarta de ensueño para tu pequeña princesa, elaborada artesanalmente con ingredientes de primera calidad. Cada capa esconde una sorpresa de sabor y color que hará brillar sus ojos de emoción. El bizcocho de vainilla, suave y esponjoso, se combina con una crema de chocolate aterciopelada que derrite el corazón en cada bocado.\n\n🧁 Ingredientes:\n• Bizcochos de vainilla esponjosos, húmedos y aromáticos\n• Relleno: crema de chocolate fino y crema de vainilla suave\n• Cubierta de buttercream de merengue suizo y enchanted cream\n• Decorada con purpurina comestible plateada y rosa\n• Mariposas, lazos rosas y perlas comestibles hechas a mano\n\n✨ Cada detalle está pensado para crear un momento mágico e inolvidable. Perfecta para cumpleaños, comuniones o cualquier celebración especial. ¡Haz que su día sea perfecto!'
    },
    {
        img: '2.jpeg', video: '2.mp4',
        title: '🍫 Tarta de Chocolate y Flores - Ganache de Lujo',
        desc: 'Una obra maestra de repostería que fusiona el intenso sabor del chocolate con la elegancia de las flores comestibles. El ganache brillante cubre capas alternadas que ofrecen distintas texturas y matices de chocolate en cada porción. Una tarta que conquista con la vista antes de probarla.\n\n🧁 Ingredientes:\n• Bizcochos de chocolate negro intenso y vainilla en capas\n• Relleno: crema de chocolate premium de alta calidad\n• Cobertura ganache de chocolate brillante y sedoso\n• Swirls de crema de chocolate y virutas de chocolate blanco\n• Flores comestibles artesanales como toque final de lujo\n\n✨ Perfecta para bodas íntimas, aniversarios especiales o cualquier celebración sofisticada. El chocolate nunca había sido tan elegante. ¡Pídela ahora!'
    },
    {
        img: '3.jpeg', video: '3.mp4',
        title: '🎅 Tarta Papa Noël - Fantasia de Vainilla y Chocolate',
        desc: 'Una tarta navideña llena de magia y sabor, perfecta para celebrar en familia el espíritu de la Navidad. El bizcocho de vainilla envuelto en ganache de chocolate recuerda los mejores chocolates calientes de invierno, y la decoración navideña la hace irresistible.\n\n🧁 Ingredientes:\n• Bizcocho de vainilla artesanal esponjoso y aromático\n• Relleno: crema de chocolate cremosa y crema pastelera clásica\n• Cobertura ganache de chocolate oscuro y enchanted cream\n• Figura decorativa de Papa Noël y detalles navideños festivos\n• Acabado brillante con colores tradicionales de la Navidad\n\n✨ Diseñada con todo el espíritu navideño para hacer de tu celebración algo único y delicioso. La magia de la Navidad en versión comestible. ¡Sorprende a todos!'
    },
    {
        img: '5.jpeg', video: '5.mp4',
        title: '💐 Tarta Boho Chic - Rosetones de Nata y Mariposas',
        desc: 'Tarta de cumpleaños con un estilo bohemio lleno de color y personalidad, perfecta para celebraciones únicas y espíritus libres. Los rosetones en rosa y azul crean un jardín comestible sobre una base de bizcocho de chocolate húmedo que sorprende con su profundidad.\n\n🧁 Ingredientes:\n• Bizcocho de chocolate húmedo y esponjoso de sabor intenso\n• Relleno: crema pastelera artesanal y chocolate blanco cremoso\n• Decoración: rosetones en nata montada de colores rosa y azul\n• Mariposas comestibles como toque mágico y primaveral\n• Sin fondant — acabado natural, ligero y fresco\n\n✨ Una creación única que combina belleza natural y sabor excepcional. Para quien ama lo auténtico y diferente. ¡Ideal para quien ama lo especial!'
    },
    {
        img: '6.jpeg', video: '6.mp4',
        title: '👸 Tarta Princesa Disney - Flores Azules y Blancas',
        desc: 'Haz realidad los sueños de tu pequeña con esta tarta inspirada en las princesas Disney, donde la elegancia y la fantasía se unen en cada capa. Las flores azules y blancas crean un jardín encantado sobre un bizcocho de vainilla con relleno de chocolate y fresa irresistible.\n\n🧁 Ingredientes:\n• Bizcocho de vainilla suave, aromático y bien húmedo\n• Relleno: crema de chocolate y crema de fresa natural\n• Acabado liso en buttercream de tonos suaves y delicados\n• Flores artesanales azules y blancas de aspecto elegante\n• Detalles de purpurina comestible para el toque mágico Disney\n\n✨ Diseñada con todo el amor del mundo para que el día más especial sea también el más dulce. El castillo de Disney en versión tarta. ¡Pídela ya!'
    },
    {
        img: '7.jpeg', video: '7.mp4',
        title: '🕷️ Tarta Spiderman - Enchanted Cream y Fondant',
        desc: 'Para el superhéroe de la casa, una tarta espectacular de Spiderman llena de sabor, acción y aventura. La tela de araña comestible cubre un interior de crema de chocolate y chocolate blanco que sorprende en cada mordisco. Una obra de repostería heroica para cualquier fan.\n\n🧁 Ingredientes:\n• Base de enchanted cream con textura suave y aireada\n• Relleno: crema de chocolate negro y chocolate blanco cremoso\n• Decoración exterior con nata montada artesanal\n• Muñeco de Spiderman y ojos expresivos modelados en fondant\n• Tela de araña comestible pintada a mano con todo el detalle\n\n✨ Una creación épica que hará rugir de emoción a cualquier fan de Spiderman. ¡Con grandes tartas vienen grandes celebraciones! ¡Reserva tu tarta héroe ahora!'
    },
    {
        img: '8.jpeg', video: '8.mp4',
        title: '🌈 Tarta Arcoíris de Cumpleaños - Bombones y Cake Drip de Chocolate',
        desc: 'Una explosión de color y felicidad para una persona muy especial, con capas de sabor y texturas irresistibles que hacen de cada porción una pequeña fiesta. El cake drip de chocolate cae como cascadas de dulzura sobre rosetones y bombones que prometen sorpresas en cada bocado.\n\n🧁 Ingredientes:\n• Bizcocho de chocolate húmedo y rico en sabor\n• Relleno: crema de chocolate y bombones enteros como sorpresa\n• Cake drip de chocolate negro brillante artesanal\n• Rosetones de chocolate con textura sedosa\n• Bombones premium y mariposas comestibles como decoración\n\n✨ Una tarta que sorprende en cada bocado y en cada mirada. Tan colorida y alegre como la persona a quien va dedicada. ¡Celebra lo grande que mereces!'
    },
    {
        img: '9.jpeg', video: '9.mp4',
        title: '📸 Tarta con Foto - Mármol de Ensueño con Corazones',
        desc: 'Una tarta única con foto personalizada sobre un elegante bizcocho marmoleado que combina estética sofisticada con sabor artesanal. El marmolado interior refleja la belleza del exterior, y los corazoncitos de chocolate añaden el toque de ternura perfecto para momentos especiales.\n\n🧁 Ingredientes:\n• Bizcocho marmoleado elaborado con técnica artesanal\n• Relleno: crema pastelera clásica, chocolate blanco y bombones escondidos\n• Cobertura de nata montada y ganache de chocolate\n• Corazoncitos decorativos de chocolate belga\n• Foto personalizada en papel comestible de alta resolución\n\n✨ Inmortaliza un momento especial en una tarta deliciosa y visualmente impresionante. Cada foto tiene una historia, esta tarta la celebra con sabor. ¡Pídela con tu foto favorita!'
    },
    {
        img: '10.jpeg', video: '10.mp4',
        title: '⚽ Tarta del Barça - Topper con Nombre y Año Culé',
        desc: 'Para los auténticos fanáticos del Fútbol Club Barcelona, una tarta tan apasionada como su equipo y tan dulce como sus victorias. Los colores blaugrana se reflejan en cada detalle decorativo mientras la nata montada enmarca un topper personalizado que hace de esta tarta una pieza única e irrepetible.\n\n🧁 Ingredientes:\n• Bizcocho de vainilla artesanal con miga perfecta y textura húmeda\n• Relleno: crema de fresa natural y crema pastelera clásica\n• Decoración en nata montada con los colores del Barça\n• Topper personalizado con nombre y año del homenajeado\n• Escudo y elementos del club reproducidos con fidelidad artesanal\n\n✨ ¡Visca el Barça! Celebra tu amor por el club con el sabor más dulce. Porque ser culé también se celebra con tarta. ¡Ideal para cualquier culé!'
    },
    {
        img: '11.jpeg', video: '11.mp4',
        title: '💜 Tarta Lila de Cumpleaños - Dulce de Leche y Ganache Blanco',
        desc: 'Una tarta de cumpleaños elegante en tonos lila con sabores artesanales que conquistan en cada bocado y enamoran con su presentación delicada. El dulce de leche cremoso convive con el ganache de chocolate blanco para crear una experiencia de sabor equilibrada y sofisticada.\n\n🧁 Ingredientes:\n• Bizcochos de vainilla con textura suave y esponjosa\n• Crema de dulce de leche artesanal, suave e intensa\n• Cobertura: ganache de chocolate blanco en tono liláceo\n• Corazoncitos de chocolate blanco como decoración romántica\n• Topper personalizado con nombre o mensaje especial\n\n✨ Una creación sofisticada y deliciosa para celebrar con estilo. Porque los cumpleaños merecen colores preciosos y sabores irresistibles. ¡Tu cumpleaños merece lo mejor!'
    },
    {
        img: '12.jpeg', video: '12.mp4',
        title: '🎵 Tarta K-POP Demon Hunters - 2 PISOS de Puro Sabor',
        desc: 'Una tarta de dos pisos épica inspirada en el universo K-POP de los Demon Hunters, para fans que merecen lo mejor y exigen tartas a la altura de sus ídolos. El primer piso de chocolate con pepitas explota en sabor, equilibrado con el segundo de vainilla y fresa, irresistible como los mejores dúos del K-POP.\n\n🧁 Ingredientes:\n• 2 pisos imponentes con estructura sólida y artesanal\n• Bizcocho de chocolate y vainilla con pepitas de chocolate\n• Relleno: chocolate negro, crema de fresa y bombones sorpresa\n• Cubierta ganache de chocolate y nata con cake drip elegante\n• Topper Demon Hunters, bolitas decorativas y mariposas comestibles\n\n✨ Una tarta tan mítica como tus artistas favoritos. Dos pisos, miles de recuerdos, un sabor épico. ¡Pídela para tu próxima fan party!'
    },
    {
        img: '13.jpeg', video: '13.mp4',
        title: '❤️ Tarta Corazón Especial - Chocolate y Nata Roja',
        desc: 'Una tarta cuadrada con un corazoncito especial en el centro, pensada con todo el amor del mundo para una amiga muy especial. El contraste entre la nata roja intensa y el chocolate oscuro crea una imagen poderosa que emociona antes de probarla. El sabor interior con choco bons escondidos es una sorpresa que nadie olvida.\n\n🧁 Ingredientes:\n• Tarta cuadrada de diseño único y atrevido\n• Bizcochos de vainilla con fideos de chocolate integrados\n• Relleno doble: crema pastelera artesanal y choco bons enteros\n• Cobertura: nata montada en rojo intenso y ganache de chocolate\n• Corazoncito de chocolate y cake drip que fluye artesanalmente\n\n✨ Un regalo dulce lleno de sentimiento, perfecto para decirle a alguien cuánto la quieres. Porque el amor también sabe así de bien.'
    },
    {
        img: '14.jpeg', video: '14.mp4',
        title: '💙 Tarta con Foto Azul - Cake Drip y Nata Bicolor',
        desc: 'Una tarta con foto personalizada bañada en tonos azules vibrantes, alegre y colorida, perfecta para celebrar a lo grande con alguien muy especial. El cake drip azul cae con elegancia sobre nata bicolor azul y blanca que enmarca la foto impresa con precisión y cariño.\n\n🧁 Ingredientes:\n• Bizcochos alternados de chocolate y vainilla con textura esponjosa\n• Relleno: crema de chocolate blanco sedosa y crema de fresa natural\n• Cake drip azul brillante con acabado espejo artesanal\n• Nata bicolor azul y blanca en degradado hecho a mano\n• Foto personalizada en papel comestible de alta definición\n\n✨ Una creación vibrante y personalizada que sorprenderá a todos los invitados. Tu recuerdo favorito convertido en el postre más especial. ¡Hazlo especial con tu foto!'
    },
    {
        img: '15.jpeg', video: '15.mp4',
        title: '🐭 Tarta Minnie Mouse - 2 Pisos con Cake Drip Rosa',
        desc: 'Una tarta de 2 pisos inspirada en la adorable Minnie Mouse, con sabores irresistibles y una decoración mágica que transporta a los más pequeños directo al mundo de Disney. El cake drip rosa que cae suavemente sobre los toppers crea una imagen de cuento que hará gritar de alegría a cualquier niña.\n\n🧁 Ingredientes:\n• 2 pisos perfectamente equilibrados y decorados artesanalmente\n• Bizcocho de vainilla suave y aromático de miga esponjosa\n• Relleno: crema de chocolate y crema de fresa natural\n• Cake drip rosa brillante como firma visual característica\n• Toppers oficiales de Minnie Mouse y rosetones de nata decorativa\n\n✨ Para los más pequeños y sus grandes sueños. Una tarta que lleva la magia de Disney directamente a tu mesa. ¡Hará que todos sonrían de oreja a oreja!'
    },
    {
        img: '16.jpeg', video: '16.mp4',
        title: '💜 Tarta Rectangular con Foto - 2 Pisos de Nata y Fresas',
        desc: 'Tarta de 2 pisos rectangular con foto personalizada, elegante y llena de sabor, perfecta para celebraciones memorables que merecen una presentación diferente. El formato rectangular ofrece más porciones y una estética moderna que combina morado y rosa con fresas frescas entre capas.\n\n🧁 Ingredientes:\n• 2 pisos en formato rectangular, moderno y diferenciador\n• Bizcocho de vainilla artesanal con miga suave y húmeda\n• Relleno: nata montada fresca y fresas naturales de temporada\n• Decoración: nata en tonos morado y rosa con efecto degradado\n• Cinta decorativa y foto personalizada en papel comestible\n\n✨ Una tarta que combina elegancia y personalización para hacer de tu celebración algo genuinamente único. Rectangular, especial, irrepetible.'
    },
    {
        img: '17.jpeg', video: '17.mp4',
        title: '🎓 Tarta Cuadrada BMW - 2 Pisos de Chocolate con Cake Drip',
        desc: 'Una tarta de dos pisos cuadrada con foto de BMW, perfecta para celebrar logros, graduaciones o cumpleaños de apasionados del motor con estilo y personalidad. El cake drip de chocolate fluye como la adrenalina de una buena conducción sobre un potente bizcocho de chocolate.\n\n🧁 Ingredientes:\n• 2 pisos cuadrados con estructura sólida y elegante\n• Bizcocho de chocolate negro intenso y húmedo\n• Relleno triple: crema de fresa, crema pastelera y bombones escondidos\n• Cake drip de chocolate con acabado profesional brillante\n• Foto personalizada de BMW en papel comestible de alta resolución\n\n✨ Para quien se lo merece todo. Celebra con una tarta tan especial como tu pasión por los coches. ¡Pídela ya!'
    },
    {
        img: '19.jpeg', video: '19.mp4',
        title: '❄️ Tarta Frozen - Chocolate y Vainilla con Topper Oficial',
        desc: 'Sumérgete en el mundo mágico de Frozen con esta tarta deliciosa y visualmente espectacular que congela el tiempo en el momento perfecto. El interior de chocolate y vainilla contrasta con la decoración helada de Elsa, mientras el topper oficial añade autenticidad Disney.\n\n🧁 Ingredientes:\n• Bizcocho de chocolate húmedo con interior sorprendente\n• Relleno: crema de chocolate y vainilla en capas alternadas\n• Acabado exterior en tonos azules y blancos glaciales\n• Topper oficial licenciado de Frozen con Elsa y Anna\n• Detalles de purpurina azul comestible para el efecto hielo\n\n✨ Para las pequeñas que sueñan con Elsa y Anna cada día. La magia de Frozen llega a tu mesa con todo su esplendor helado.'
    },
    {
        img: '20.jpeg', video: '20.mp4',
        title: '👸 Tarta Princesa de 2 Pisos - Muñeca, Bolitas y Mariposas',
        desc: 'Una tarta de 2 pisos espectacular con muñeca de princesa coronando la cima, perfecta para las más pequeñas que merecen vivir un cuento de hadas. Las bolitas y mariposas comestibles crean un jardín mágico alrededor de la muñeca mientras el interior combina bombones y cremas que deleitan a todos.\n\n🧁 Ingredientes:\n• 2 pisos de bizcocho alternado de chocolate y vainilla\n• Relleno: crema de chocolate, fresa y bombones enteros de sorpresa\n• Decoración artesanal con bolitas de colores y mariposas comestibles\n• Muñeca de princesa como elemento central y protagonista\n• Acabado liso en buttercream con degradado suave\n\n✨ Una tarta como un cuento de hadas que hará brillar los ojos de tu princesa. Dos pisos de magia, amor y sabor. ¡Resérvala ahora!'
    },
    {
        img: '21.jpeg', video: '21.mp4',
        title: '🥂 Tarta Blanco y Oro - Papel Comestible y Topper Happy Birthday',
        desc: 'Elegancia y sofisticación en su máxima expresión, una tarta de celebración en blanco y oro puro que impresiona desde el primer momento. Las volutas de nata en oro y blanco combinadas con papel de oro comestible y el topper dorado crean una pieza de repostería digna de alta gama.\n\n🧁 Ingredientes:\n• Bizcocho de chocolate negro con interior profundo y rico\n• Relleno: crema de avellanas artesanal y nata montada\n• Nata decorativa con volutas en tonos oro y blanco\n• Papel de oro comestible aplicado artesanalmente\n• Topper Happy Birthday dorado como símbolo de la celebración\n\n✨ Para celebrar años de amor, logros y momentos únicos con una tarta digna de la mejor ocasión. El lujo también tiene sabor. ¡Reserva la tuya!'
    },
    {
        img: '22.jpeg', video: '22.mp4',
        title: '🌟 Tarta de Aniversario Blanco y Oro - Números Dorados',
        desc: 'Una tarta de aniversario exquisita en blanco y oro puro que celebra los años vividos con toda la elegancia que merecen. El bizcocho de chocolate intenso se funde con una crema de avellanas y nata que derrite el corazón, mientras las volutas doradas y el papel de oro crean una pieza digna de un evento de alta gama.\n\n🧁 Ingredientes:\n• Bizcocho de chocolate negro húmedo de sabor profundo e irresistible\n• Relleno: crema de avellanas artesanal y nata montada suave\n• Decoración: nata con volutas en tonos oro y blanco hechas a mano\n• Papel de oro comestible aplicado artesanalmente como toque de lujo\n• Topper Happy Birthday de color oro como corona de la celebración\n\n✨ Para los años que merecen una tarta tan especial como el amor que celebran. Elegancia, sabor y recuerdos en cada porción. ¡Reserva la tuya!'
    },
    {
        img: '23.jpeg', video: '23.mp4',
        title: '🐭 Tarta Mágica de Mickey Mouse - El Sueño de Miki',
        desc: '¡Haz que la fiesta de tu pequeño sea inolvidable con el ratoncito más querido del mundo! Una creación llena de color y alegría que transportará a todos a la magia de Disney. Esta tarta no solo es un festín para la vista con su temática de Mickey y Minnie, sino una delicia irresistible que combina la suavidad de la vainilla con el toque premium de los bombones.\n\n🧁 Ingredientes:\n• Bizcocho de vainilla artesanal, tierno y muy esponjoso\n• Relleno: Krem de chocolate y fresa natural de sabor intenso\n• Bombones premium integrados entre capas para un toque crujiente\n• Decoración temática inspirada en Mickey y Minnie Mouse\n• Detalles artesanales en cada bocado\n\n✨ Sorprende al cumpleañero con su personaje favorito convertido en la tarta más deliciosa. ¡La magia de Mickey en tu celebración!'
    },
    {
        img: '24.jpeg', video: '24.mp4',
        title: '🎀 Tarta Hello Kitty - Dulzura y Encanto Rosa',
        desc: 'La tarta más dulce para las más fans de Hello Kitty. Un diseño infantil encantador que combina la intensidad del chocolate con la suavidad del chocolate blanco. Cada porción es un viaje de texturas gracias a los bombones sorpresa escondidos en su interior, haciendo que cada momento de la merienda sea una celebración mágica.\n\n🧁 Ingredientes:\n• Bizcocho de chocolate negro, húmedo y lleno de sabor\n• Relleno: Crema pastelera artesanal y chocolate blanco cremoso\n• Bombones sorpresa en el interior para una experiencia explosiva\n• Decoración infantil temática de Hello Kitty con detalles en rosa\n• Acabado artesanal delicado y divertido\n\n✨ Perfecta para cumpleaños infantiles donde la dulzura y la diversión son las protagonistas. ¡Regala un momento Hello Kitty!'
    },
    {
        img: '25.jpeg', video: '25.mp4',
        title: '👑 Tarta Real con Foto de Princesas - Tu Pequeña es la Protagonista',
        desc: 'Convierte a tu hija en la verdadera protagonista de su propio cuento de hadas. Esta tarta combina la elegancia de las princesas con la personalización más emotiva: ¡su propia foto! Una obra maestra de dos sabores que une lo mejor de la vainilla y el chocolate para satisfacer a todos los paladares reales.\n\n🧁 Ingredientes:\n• Mix de bizcocho de vainilla y chocolate para un contraste perfecto\n• Relleno doble: Krema de chocolate y crema pastelera tradicional\n• Foto personalizada de la niña en papel comestible de alta definición\n• Decoración temática inspirada en las princesas favoritas\n• Detalles dorados y mágicos para un acabado de lujo\n\n✨ Haz que se sienta como una auténtica princesa en su día especial. Un recuerdo inolvidable que se puede comer. ¡Personaliza la suya ahora!'
    }
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
            <div class="testimonial-meta">
                <span class="testimonial-rating">${'⭐'.repeat(testimonial.rating)}</span>
                <span class="testimonial-event">${testimonial.event}</span>
            </div>
            <p class="testimonial-text">${testimonial.text}</p>
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

// ========== Mobile Menu Toggle (animated hamburger) ==========
function toggleMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    const isOpen = menu.classList.contains('open');

    if (isOpen) {
        menu.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
    } else {
        menu.classList.add('open');
        btn.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        menu.setAttribute('aria-hidden', 'false');
    }
}

// Close menu on outside click
document.addEventListener('click', function (e) {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
    }
});

// Close menu on resize to desktop
window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024) {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        if (btn) { btn.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
        if (menu) { menu.classList.remove('open'); menu.setAttribute('aria-hidden', 'true'); }
    }
});

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
