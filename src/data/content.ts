import { i } from "framer-motion/client";

export const personalContent = {
    mainLetter : {
        tittle: "",
        body: "",
    },
    links: [
        {id: 'l1', title: 'Memories', description: 'Something that the life could never take from us', path: '/collage'}, //link to the collage page
        {id: 'l2', title: 'Our vibe', description:'Like us, something that is so deep and beauty', path:'spotify/'}, //link to the spotify playlist
        {id: 'l3', title: 'Are you ready?', description: 'I hope you recall this', path: 'secret/'}, //secret link (?)
    ]
};


export const projectData = {
    //Main letter on the landing page
    landing:{
        title: "",
        body: ""
    },

    collage: [
        //Images and letters for each photo
        {
            id: 1,
            image: "/photos/memory1.webp",
            note: "",
        }
    ],

};