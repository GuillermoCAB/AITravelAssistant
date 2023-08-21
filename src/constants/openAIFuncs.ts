import { carsArrayName } from './cars';

const openAIFuncs = [
  {
    name: 'scheduleMeeting',
    description:
      'Schedule a meeting for the user on Audi store. If the desired time is already booked then return an error message. TO USE THIS USER NEEDS TO BE VERIFYIED PRIOR AND HAVE A VALID TOKEN ON FE',
    parameters: {
      type: 'object',
      properties: {
        date: {
          type: 'string',
          description:
            'The date the user wants to visit. Should follow the format mm/dd/yyyy. This needs to be the selected by the user, ask him for this information before calling the function, dont create the data.',
        },
        time: {
          type: 'string',
          description:
            'The time the user wants to visit. We use the 24 hours model, also it only works from 08 until 19. Should follow the format hh:mm. This needs to be the selected by the user, ask him for this information before calling the function, dont create the data.',
        },
        name: {
          type: 'string',
          description:
            'The name of the user so we can add on the booked time information. This needs to be the user real name, ask him for this information before calling the function, dont create the data.',
        },
        email: {
          type: 'string',
          description:
            'The email of the user so we can add on the booked time info. This needs to be the user real email, ask him for this information before calling the function, dont create the data.',
        },
        vehicle: {
          type: 'string',
          description:
            'The name of the vehicle the user wants to do the test drive. Can add multiple names, can add as much informations as you have, for example if you have the trim, the model, and any other subtype add here.',
        },
      },
      required: ['date', 'time', 'name', 'email', 'vehicle'],
    },
  },
  {
    name: 'selectCar',
    description:
      'This function change the UI of the web app user is looking at to show the car it received as param. The name of the param must exactly match what the function is expecting. You should use this wheneve the user show interest in some of the car this function can take as param.',
    parameters: {
      type: 'object',
      properties: {
        carName: {
          type: 'string',
          description: 'The name of the car the UI should show to the user',
          enum: carsArrayName,
        },
      },
      required: ['carName'],
    },
  },
  {
    name: 'registerUser',
    description:
      'Used to create an User object on our DB via API call. This is the first step to register the user, after the call an email will be sent to user with a code that needs to be user on another API call to update user status on DB.',
    parameters: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description:
            'The name of the user so we can add on the booked time information. This needs to be the user real name, ask him for this information before calling the function, dont create the data.',
        },
        email: {
          type: 'string',
          description:
            'The email of the user so we can add on the booked time info. This needs to be the user real email, ask him for this information before calling the function, dont create the data.',
        },
      },
      required: ['name', 'email'],
    },
  },
  {
    name: 'checkUserCode',
    description:
      'Used to check if the user owns the referred email, if he does then a bearer token is generated on the API and stored on the FE to be used on necessary requests.',
    parameters: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
          description:
            'The code the user received on the email. This needs to be the user real code, ask him for this information before calling the function, dont create the data.',
        },
        email: {
          type: 'string',
          description:
            'The email of the user so we can add on the booked time info. This needs to be the user real email, ask him for this information before calling the function, dont create the data.',
        },
      },
      required: ['code', 'email'],
    },
  },
  {
    name: 'requireNewCode',
    description:
      'Used generate a code and send to the provided email. This code will be used further to verify if the user owns the email and then generate a bearer token.',
    parameters: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description:
            'The email of the user so we can add on the booked time info. This needs to be the user real email, ask him for this information before calling the function, dont create the data.',
        },
      },
      required: ['email'],
    },
  },
  {
    name: 'updateInterests',
    description:
      'Used update the array of interests for a specific user. When you discover some interest that can be used as data for us, then you should call this function to add this new interest on the user object on the DB. This will not affect the user experience in any way, is use only to keep track of his interests. TO USE THIS USER NEEDS TO BE VERIFYIED PRIOR AND HAVE A VALID TOKEN ON FE',
    parameters: {
      type: 'object',
      properties: {
        interests: {
          type: 'array',
          items: {
            type: 'string',
            description:
              'String that represents the interest the user has in something',
          },
        },
      },
      required: ['interests'],
    },
  },
  {
    name: 'cancelMeeting',
    description:
      'Cancel a meeting for the user on Audi store. Prior to call this function, we need to have user email and perform a verification, only after this function will work',
    parameters: {
      type: 'object',
      properties: {
        date: {
          type: 'string',
          description:
            'The date the user wants to visit. Should follow the format mm/dd/yyyy. This needs to be the selected by the user, ask him for this information before calling the function, dont create the data.',
        },
        time: {
          type: 'string',
          description:
            'The time the user wants to visit. We use the 24 hours model, also it only works from 08 until 19. Should follow the format hh:mm. This needs to be the selected by the user, ask him for this information before calling the function, dont create the data.',
        },
      },
    },
    required: ['date', 'time'],
  },
  {
    name: 'getUserSchedule',
    description:
      'Get all the meetings scheduled related to the specific user. TO USE THIS USER NEEDS TO BE VERIFYIED PRIOR AND HAVE A VALID TOKEN ON FE',
    parameters: {
      type: 'object',
      properties: {},
    },
  },
];

export default openAIFuncs;
