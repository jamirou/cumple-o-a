import michiCocinero from '../assets/michicocinero.jpeg';
import michiBiologo from '../assets/michibiologo.png';
import michiFisico from '../assets/michifisico.jpeg';
import michiPrograma from '../assets/michiprograma.jpeg';
import villano from '../assets/villano.png';

export const HEROES = {
    chef: {
        id: 'chef',
        name: 'Michi Chef',
        role: 'Tanque',
        img: michiCocinero,
        stats: { hp: 120, atk: 15, def: 20 },
        ability: 'Lanzamiento de Cupcake Explosivo',
        desc: 'Un gato gordito y naranja. Experto en repostería y caos.'
    },
    bio: {
        id: 'bio',
        name: 'Michi Bio-Tec',
        role: 'Mago',
        img: michiBiologo,
        stats: { hp: 80, atk: 25, def: 10 },
        ability: 'Bacterias Benéficas',
        desc: 'Curioso y analítico. Ataca con ciencia.'
    },
    quantum: {
        id: 'quantum',
        name: 'Michi Cuántico',
        role: 'Pícaro',
        img: michiFisico,
        stats: { hp: 90, atk: 20, def: 15 },
        ability: 'Salto de Incertidumbre',
        desc: 'Elegante y ñoño. Puede alterar la gravedad.'
    },
    hacker: {
        id: 'hacker',
        name: 'Michi Dev',
        role: 'Soporte',
        img: michiPrograma,
        stats: { hp: 100, atk: 10, def: 10 },
        ability: 'Debug',
        desc: 'El nexo con el creador. Hackea la realidad.'
    }
};

export const VILLAINS = {
    cookie: {
        name: 'Galleta Dura',
        hp: 50,
        atk: 10,
        dialogue: '¡Soy imposible de morder!'
    },
    virus: {
        name: 'Virus Informático',
        hp: 80,
        atk: 15,
        dialogue: '010101... Tu sistema caerá.'
    },
    boss: {
        name: 'Dr. Aspiradora',
        img: villano,
        hp: 200,
        atk: 25,
        dialogue: '¡MUAJAJA! ¡Adiós a los pelos de gato!'
    }
};

export const STAGES = [
    {
        id: 1,
        title: 'Valle de Glaseado',
        bg: 'valleglaseado.png', // We'll handle imports in the component or use paths
        hero: 'chef',
        enemy: 'cookie',
        questions: [
            {
                q: "¿Cuál es el ingrediente secreto para que el merengue quede firme?",
                options: ["Cremor Tártaro", "Sal", "Aceite", "Agua"],
                correct: 0,
                hint: "Es un polvo blanco ácido..."
            },
            {
                q: "¿Qué pasa si bates demasiado la crema?",
                options: ["Se hace mantequilla", "Se evapora", "Explota", "Se pone azul"],
                correct: 0,
                hint: "Se separa la grasa del suero."
            }
        ]
    },
    {
        id: 2,
        title: 'Laboratorio del Caos',
        bg: 'laboratoriodelcaos.png',
        hero: 'bio', // Primary hero for this stage
        enemy: 'virus',
        questions: [
            {
                q: "¿Qué enzima rompe el ADN en fragmentos específicos?",
                options: ["Ligasa", "Polimerasa", "Endonucleasa de restricción", "Helicasa"],
                correct: 2,
                hint: "Cortan como tijeras moleculares."
            },
            {
                q: "En física, ¿qué partícula no tiene masa?",
                options: ["Electrón", "Fotón", "Protón", "Neutrón"],
                correct: 1,
                hint: "Es la partícula de la luz."
            }
        ]
    },
    {
        id: 3,
        title: 'Fortaleza del Dr. Aspiradora',
        bg: 'fortalezafinal.png',
        hero: 'all',
        enemy: 'boss',
        puzzle: {
            type: 'dna',
            sequence: ['A', 'T', 'G', 'C'],
            target: ['T', 'A', 'C', 'G'] // Complementary
        }
    }
];
