// src/routes/index.ts
import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter); // quando o /appointments for chamado, ele será redirecionado para a classe appointmentRouter
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
