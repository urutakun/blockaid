import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                font1Light: 'Founders Grotesk X-Cond Reg',
                font1Med: 'Founders Grotesk X-Cond Med',
                font1Smbd: 'Founders Grotesk X-Cond SmBd',
                font2: 'Founders Grotesk',
                font3: 'PP Editorial New Ultralight'
            },
            colors: {
                'cwhite' : '#F5F4F4',
                'cgray' : '#D2D2CE',
                'cblack' : '#101010',
                'cgreen' : '#A2DE62',
                'clgreen' : '#B9EA84'
            }
        },
    },

    plugins: [forms, require('tailwind-scrollbar')],
};
