import { carsArrayName } from './cars';

const openAIFuncs = [
  {
    name: 'scheduleMeeting',
    description:
      'Schedule a meeting for the user on the nearest Audi store. If the desired time is already booked then return an error message',
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
    },
  },
];

export default openAIFuncs;
