import * as T from "fp-ts/Task"
import { flow, pipe } from "fp-ts/function"

const sleep = (sec: number) => new Promise((resolve) => setTimeout(resolve, sec * 1000))

type A = number
type AA = number

type B = number
type BB = string

type C = void

const fxA = (input: A): T.Task<B> => async () => {
  console.log(`start fxA with ${input}`)
  await sleep(5)
  console.log(`done fxA with ${input}`)
  return input + 1
}

const fxB = (input: B): T.Task<BB> => async () => {
  console.log(`start fxB with ${input}`)
  await sleep(3)
  console.log(`done fxB with ${input}`)
  return `|${input}|`
}

const fxC = (a: AA) => (b: BB): C => console.log({ a, b })

const x1 = fxA(1)
const x2 = fxB(1)

const t1 = T.of(fxC)

const x3 = pipe(t1, T.ap(x1), T.ap(x2))
x3()
