const groups = [
  {
    color: "#5796B3",
    backgroundColor: "#5AA8CC",
    textColor: "#FF8A99",
    children: [
      {
        type: "svg",
        props: {
          // src: '/assets/cursor.svg'
          src: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/svg/tiger.svg'
          // src: 'https://raw.githubusercontent.com/drcmda/react-three-fiber/master/examples/resources/images/svg/night.svg'
        }
      },
      {
        type: "text",
        props: {
          size: 1,
          letterSpacing: 0.2,
          children: "Projet #1"
        }
      },
      {
        type: "card",
        props: {
          video: "video1",
          label: "Virtual reality"
        }
      },
      {
        type: "card",
        props: {
          image:
            "https://media.istockphoto.com/photos/virtual-reality-engineer-works-with-vr-glasses-on-while-doing-on-picture-id870233698"
        }
      },
      {
        type: "card",
        props: {
          video: "video2",
          label: ""
        }
      },
      {
        type: "card",
        props: {
          image:
            "https://miro.medium.com/max/1920/1*hWFmSw7JLyKJNpjbEzQgMA.jpeg"
        }
      },
      {
        type: "card",
        props: {
          image:
            "https://image.shutterstock.com/image-photo/factory-chief-engineer-wearing-vr-600w-1053687887.jpg"
        }
      },
    ]
  },
  {
    color: "#9BFF99",
    backgroundColor: "#8BDEE8",
    textColor: "#E2FF99",
    children: [
      {
        type: "text",
        props: {
          size: 1,
          letterSpacing: 0.2,
          children: "Projet #2"
        }
      },
      {
        type: "card",
        props: {
          video: "video1",
          label: "Virtual reality"
        }
      },
      {
        type: "card",
        props: {
          image:
            "https://media.istockphoto.com/photos/virtual-reality-engineer-works-with-vr-glasses-on-while-doing-on-picture-id870233698"
        }
      },
      {
        type: "card",
        props: {
          video: "video2",
          label: ""
        }
      },
      {
        type: "card",
        props: {
          image:
            "https://miro.medium.com/max/1920/1*hWFmSw7JLyKJNpjbEzQgMA.jpeg"
        }
      }
    ]
  },
  {
    color: "#5796B3",
    backgroundColor: "#5AA8CC",
    textColor: "#FF8A99",
    children: [
      {
        type: "text",
        props: {
          size: 1,
          letterSpacing: 0.2,
          children: "À vous !"
        }
      },
    ]
  }
];

export default groups;
