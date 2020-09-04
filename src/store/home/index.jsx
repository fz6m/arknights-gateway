const initialState = {
  num: 99,
  text: "LV",
  name: "Yingci",
  description: "fz6m",

  banner: {
    text:
      "哪有喜欢孤独的人，只是他们不喜欢绝望而已。",
    friend: "友联",
    information: "随笔",
    url: {
      friend: 'https://fz6m.com/links/',
      information: 'https://fz6m.com/dynamic/',
      github: 'https://github.com/fz6m/arknights-gateway',
      wordpress:'https://fz6m.com/'
    }
  },

  slider: {
    images: [
      {
        src:
          "https://cdn.jsdelivr.net/gh/fz6m/Private-web@40.2/images/1.jpg",
      },
      {
        src:
          "https://cdn.jsdelivr.net/gh/fz6m/Private-web@40.2/images/2.jpg",
      },
      {
        src:
          "https://cdn.jsdelivr.net/gh/fz6m/Private-web@40.2/images/3.jpg",
      },
    ]
  },

  side: {
    money: 95,
    gem: 96,
    stone: 97,
    url: {
      chapter: 'https://fz6m.com', // title
      team: 'https://github.com/fz6m/opqqq-plugin',
      member: 'https://fz6m.github.io/kyaru-concat-magic/', // players
      shop: 'https://music.163.com/#/user/home?id=291516471',
      recruit: 'https://github.com/fz6m', // openRecruit
      search: 'https://blog.csdn.net/qq_21567385',
      task: 'https://harem.fz6m.com',
      base: 'https://t.me/hajimeyuki',
      warehouse: 'mailto:fz6meng@gmail.com'
    },
    fight: {
      num: 100,
      reason: '理智/99',
      title: '博客主站',
      current: 'Gateway',
      chapter: 'Untitled world',
      team: 'QQBot',
      players: '接头霸王',
      shop: 'Netease',
      recruit: '技术',
      openRecruit: 'Github',
      search: 'CSDN',
      task: 'Harem',
      base: 'Telegram',
      warehouse: 'Mail'
    }
  }
  
};

export default (state = initialState) => {
  return state;
};
