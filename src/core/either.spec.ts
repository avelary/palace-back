import { left, right, Either } from "./either"

function doSomething(shouldSucess: boolean): Either<string, number> {
  if(shouldSucess){
    return right(10)
  } else {
    return left('error')
  }
}

test('sucess result', () => {
  const result = doSomething(true)

  expect(result.isRight()).toEqual(true)
   expect(result.isLeft()).toEqual(false)
})

test('error result', () => {
  const result = doSomething(false)

  expect(result.isLeft()).toEqual(true)
  expect(result.isRight()).toEqual(false)
})