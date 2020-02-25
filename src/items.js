const items = [
  {
    type: 'text',
    props: {
      color: 'gray',
      size: 1,
      letterSpacing: 0.2,
      position: [0, 0, 0],
      children: 'Projet #1'
    }
  },
  {
    type: 'card',
    props: {
      position: [-2, -2, -5],
      video: 'video1',
      label: 'Virtual reality'
    }
  },
  {
    type: 'card',
    props: {
      position: [-1.5, 2, -6],
      image: '/assets/image1.jpg',
    }
  },
  {
    type: 'card',
    props: {
      position: [3, 1.5, -7],
      video: 'video1',
      label: 'Virtual reality'
    }
  },
  {
    type: 'card',
    props: {
      position: [3, -2.5, -8],
      image: '/assets/image1.jpg',
    }
  },
  {
    type: 'text',
    props: {
      color: 'pink',
      size: 1,
      letterSpacing: 0.2,
      position: [0, 0, -14],
      children: 'Projet #2'
    }
  },
]

export default items;