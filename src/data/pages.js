export const pages = {
  '/how-it-works': {
    label: 'THE AIRDASH WAY',
    title: 'LESS WAITING.\nMORE LIVING.',
    intro:
      'From the things you love to the place you call home. A simpler journey, through the sky.',
    image: 'food',
    cta: 'GET AIRDASH',
    to: '/waitlist',
    sections: [
      [
        '01 / Choose your favourites',
        'Discover local food and everyday essentials as merchants become available in your area.',
      ],
      [
        '02 / Pin your drop spot',
        'Choose an open outdoor location. Your drop spot is checked before a delivery can be confirmed.',
      ],
      [
        '03 / Follow your dash',
        'See the journey in the app. Stay clear during lowering, then collect only when you receive the ready message.',
      ],
    ],
  },
  '/tether-delivery': {
    label: 'THE FINAL FEW METRES',
    title: 'YOUR DELIVERY LANDS.\nTHE AIRCRAFT DOESN’T.',
    intro:
      'A controlled descent brings your package to the selected drop spot while the aircraft remains above.',
    image: 'compound',
    cta: 'EXPLORE SAFETY',
    to: '/safety',
    sections: [
      [
        'A place for your delivery',
        'Select a clear, open outdoor area. Keep people, pets and loose objects away from the drop spot.',
      ],
      [
        'Lowered with care',
        'The package descends on a tether. Stay back and let the delivery finish without touching the cable or aircraft.',
      ],
      [
        'Your cue to collect',
        'Wait for the app’s Ready to collect message before approaching. Follow the instructions shown for your delivery.',
      ],
    ],
  },
  '/coverage': {
    label: 'BUILT FOR YOUR NEIGHBOURHOOD',
    title: 'LAGOS.\nLET’S CONNECT.',
    intro:
      'AirDash is preparing for a new kind of local delivery. Confirmed launch areas will be published here.',
    image: 'lagos',
    type: 'coverage',
    cta: 'GET LAUNCH UPDATES',
    to: '/waitlist',
  },
  '/safety': {
    label: 'CARE IN EVERY DIRECTION',
    title: 'THOUGHTFUL,\nFROM THE GROUND UP.',
    intro:
      'A clear drop spot. A controlled handover. A delivery experience designed around the people below.',
    image: 'compound',
    cta: 'HOW TETHER DELIVERY WORKS',
    to: '/tether-delivery',
    sections: [
      [
        'Keep the drop spot clear',
        'Choose open space with a clear view of the sky. Keep people and pets away during the delivery.',
      ],
      [
        'Let the aircraft do its job',
        'Never approach, touch or attempt to catch an aircraft, tether or descending package.',
      ],
      [
        'Wait for the all-clear',
        'Only collect after the app confirms that your delivery is ready. Service may be unavailable when conditions are unsuitable.',
      ],
    ],
  },
  '/merchants': {
    label: 'FOR THE PEOPLE MAKING OUR FAVOURITES',
    title: 'GOOD THINGS.\nA WIDER REACH.',
    intro: 'You bring the flavour. We’re building a new way to bring it closer to your customers.',
    image: 'merchant',
    cta: 'REGISTER YOUR INTEREST',
    to: '/waitlist?interest=merchant',
    sections: [
      [
        'Made locally. Going further.',
        'Help shape a delivery experience for the restaurants, shops and everyday businesses that make Lagos special.',
      ],
      [
        'A considered handover',
        'Packaging and collection requirements will be shared during partner onboarding.',
      ],
      [
        'Let’s build it together',
        'Register your interest to prepare for future merchant opportunities. Launch timing and eligibility are still to be confirmed.',
      ],
    ],
  },
  '/communities': {
    label: 'A BETTER-CONNECTED PLACE TO LIVE',
    title: 'MORE POSSIBILITY.\nCLOSER TO HOME.',
    intro: 'Bring a new kind of convenience to your estate, compound or neighbourhood.',
    image: 'compound',
    cta: 'REGISTER YOUR COMMUNITY',
    to: '/waitlist?interest=community',
    sections: [
      [
        'Designed around your space',
        'We’re interested in working with communities to explore suitable shared drop areas.',
      ],
      [
        'Residents come first',
        'Clear access, thoughtful communication and practical delivery guidance are part of the conversation.',
      ],
      [
        'Start a conversation',
        'Estate managers and community representatives can register interest for future discussions.',
      ],
    ],
  },
  '/about': {
    label: 'AIRDASH / OUR POINT OF VIEW',
    title: 'A CITY IN MOTION.\nA DIFFERENT DIRECTION.',
    intro: 'Lagos never stands still. Everyday delivery should move with it.',
    image: 'lagos',
    cta: 'SEE HOW IT WORKS',
    to: '/how-it-works',
    sections: [
      [
        'Time for what matters',
        'We’re building AirDash around a simple idea: less time waiting for the everyday things, more time enjoying them.',
      ],
      [
        'Rooted in real life',
        'Local restaurants. Busy neighbourhoods. The places and people that make the city home.',
      ],
      [
        'The next chapter',
        'Follow our journey as we prepare for launch. Service details and availability will be confirmed as we progress.',
      ],
    ],
  },
  '/help': {
    label: 'A LITTLE DIRECTION',
    title: 'HERE TO\nHELP.',
    intro: 'A few things to know before your first AirDash.',
    image: 'merchant',
    cta: 'CONTACT AIRDASH',
    to: '/contact',
    type: 'faq',
    sections: [
      [
        'Is AirDash available now?',
        'Launch areas and dates have not been confirmed. Visit Coverage for updates and save your interest on the waitlist page.',
      ],
      [
        'Where can my delivery arrive?',
        'Deliveries require a suitable open outdoor drop spot. Eligibility will be checked before an order can be confirmed.',
      ],
      [
        'Do I catch the package?',
        'No. Stay clear of the drop spot and wait for the Ready to collect message before approaching.',
      ],
      [
        'Can my business or estate get involved?',
        'Yes. Visit the Merchants or Communities pages to learn more and register your interest.',
      ],
    ],
  },
  '/contact': {
    label: 'LET’S TALK',
    title: 'GOOD THINGS\nSTART HERE.',
    intro: 'Have a question, a business idea or a community in mind? Prepare your message below.',
    image: 'merchant',
    type: 'contact',
  },
  '/waitlist': {
    label: 'BE PART OF WHAT’S NEXT',
    title: 'YOUR NEXT DASH\nSTARTS HERE.',
    intro: 'Be ready for a little less waiting and a lot more living.',
    image: 'lagos',
    type: 'waitlist',
  },
}
