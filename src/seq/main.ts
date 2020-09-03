import * as T from "fp-ts/Task"
import * as AP from "fp-ts/Apply"

import { flow } from "fp-ts/function"

const sleep = (sec: number) => new Promise((resolve) => setTimeout(resolve, sec * 1000))

type A = number
type AA = number

type B = number
type BB = string

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

type totalArgs = { a: AA; b: BB }
const total = (input: totalArgs): T.Task<void> => async () => {
  console.log(`run total`, input)
  await sleep(1)
  console.log("all done")
}

const prepare = (input: number) => ({ a: fxA(input), b: fxB(input) })
const p = AP.sequenceS(T.task)
const zz = flow(prepare, p, T.chain(total))

zz(15)()
