import { IO } from "fp-ts/IO";
import { Task } from "fp-ts/Task";

const _io =
  <A>(io: (t: A) => IO<void>) =>
  (a: A): A => {
    io(a)();
    return a;
  };

const _task =
  <A>(task: (t: A) => Task<void>) =>
  (a: A): A => {
    task(a)();
    return a;
  };

export const rent = {
  io: _io,
  task: _task,
};
