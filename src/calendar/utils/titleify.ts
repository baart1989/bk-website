import { EventType, PaymentType } from '../../API';

export const eventTypeName = (type: EventType) => {
  switch (type) {
    case 'consultation':
      return 'Konsultacje';
    case 'research_analysis':
      return 'Analiza badań';
    case 'research_analysis_with_diet':
      return 'Plan diety z analizą badań';
    default:
      throw Error(`Unknown eventType ${type}`);
  }
};

export const paymentTypeName = (type: PaymentType) => {
  switch (type) {
    case 'bank_transfer':
      return 'Przelew bankowy';
    default:
      throw Error(`Unknown eventType ${type}`);
  }
};

export const clientName = (clientId: string) => {
  switch (clientId) {
    case 'annapodsiadlo':
      return 'Anna Podsiadło';
    default:
      throw Error(`Unknown client ${clientId}`);
  }
};
