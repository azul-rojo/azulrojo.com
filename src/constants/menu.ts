export const MENU_PROPS = {
  title: 'Azul Rojo',
  linkSections: [
    {
      links: [
        {
          'href': '/',
          'children': 'Home',
          'isInternal': true,
        }
      ]
    },
    {
      sectionName: 'Projects',
      links: [
        {
          href: '/survivalkits',
          children: 'Survival Kits',
          isInternal: true,
        },
      ]
    },
    {
      sectionName: 'Contact',
      links: [
        {
          href: 'https://instagram.com/_azulrojo',
          children: 'Instagram',
          isInternal: false,
        },
        {
          href: 'https://forms.gle/HcqHyoyTecky5M3p6',
          children: 'Google Form',
          isInternal: false,
        }
      ]
    }
  ]
}
