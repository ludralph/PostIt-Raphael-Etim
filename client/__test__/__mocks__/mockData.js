export default ({
  members: [
    {
      id: 1,
      email: 'hustle@gmail.com',
      username: 'hustler',
    }
  ],
  nonMembers: {
    users: [
      {
        id: 2,
        email: 'raphaelumoh@gmail.com',
        username: 'raphael',
      }
    ],
    pagination: {
      page: 1,
      pageCount: 1,
      pageSize: 2,
      totalCount: 2
    }
  },
  search: {
    searchTerm: 'a',
    group: 1,
    limit: 1,
    offset: 1
  },
  group: {
    id: 1,
    name: 'Best group Ever'
  },
  userDetail: {
    userId: 2
  },
  messages: [
    {
      id: 1,
      content: 'My first Message',
      priority: 'Normal',
    },
    {
      id: 2,
      content: 'My second Message',
      priority: 'Normal',
    }
  ],
  message: {
    id: 1,
    senderId: 3,
    content: 'Welcome to Manchester United',
    priority: 'Normal'
  },
  authResponse: {
    message: 'Successful!',
    user: {
      id: 1,
      name: 'hustler',
      email: 'hustle@gmail.com'
    },
    token: 'eyJhbGci.I6MQ0fQ.mqnk8I'
  },
  id: '5',
  passwordActions: {
    resetToken: 'TjDkmRh3mYTayaN2NKBWUrtmG4',
    password: 'forever21',
    email: 'flow@gmail.com'
  },
  componentData: {
    signup: {
      validSignupDetails: {
        username: 'jostle',
        email: 'jostle@gmail.com',
        password: 'jostle1234'
      },
      invalidEmail: {
        username: 'isaac',
        email: '@issac',
        password: 'IsAaC000'
      },
      invalidUserName: {
        username: '   isaac',
        email: 'isaac@gmail.com',
        password: 'IsAaC000'
      },
      invalidPassword: {
        username: 'isaac',
        email: 'isaac@',
        password: 'IsAaC0'
      }
    },
    welcomePage: {
      groups: [
        {
          id: 1,
          name: 'Manchester United'
        },
        {
          id: 2,
          name: 'Westlife'
        }
      ],
      currentUser: {
        name: 'Mike',
        email: 'mike@gmail.com'
      }
    },
    resetPassword: {
      resetToken: 'TjDkmRh3mYTayaN2NKBWUrtmG4'
    },
    messageList: [
      {
        id: 1,
        content: 'A',
        createdAt: '2017-11-14 12:15:42.121+01',
        User: { username: 'tim' }
      }
    ],
    groupMember: {
      users: {
        members: [
          { id: 1, username: 'Emem12345' }
        ],
        nonMembers: [
          { id: 3, username: 'Solomon' }
        ],
        pagination: {}
      },
      groupId: 2
    }
  }
});
