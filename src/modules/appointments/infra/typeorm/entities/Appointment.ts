import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments') // passa o mouse em cima do Entity que explica bem
class Appointment {
  @PrimaryGeneratedColumn('uuid') // pk
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Com o TypeORM não precisamos criar um constructor, pois ele meio que faz isso
  // --------------------------------------------------------------------------------------
  // Omit adiciona a tipagem, porém remove o segundo parâmetro.
  // Neste caso ele adicionou a tipagem Appointments, declarada aqui mesmo, e excluiu o id.
  // constructor({ provider, date }: Omit<Appointment, 'id'>) {
  //   this.id = uuid();
  //   this.provider = provider;
  //   this.date = date;
  // }
}

export default Appointment;
