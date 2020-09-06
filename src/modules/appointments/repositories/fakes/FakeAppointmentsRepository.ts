import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRespository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../../infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    // Essa linha é a mesma coisa
    Object.assign(appointment, { id: uuid(), date, provider_id });

    // que o abaixo:
    // appointment.id = uuid();
    // appointment.date = date;
    // appointment.provider_id = provider_id;

    // Object.assing une adiciona ao primeiro objeto o que vem em seguida

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
