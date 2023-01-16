import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import userModel from './models/user/user.model.js'

const users = userModel;

export async function createUser( username, password ) {

  const user = {
    user_id: uuidv4(),
    username,
    password
  }

  users.create(user)

  return { username, createdAt: Date.now() }
}


export async function findUser(username) {
  return users.findOne({username: username}, {password: 0}).clone()
}


export function validatePassword(user, inputPassword) {
  const passwordsMatch = user.password === inputPassword
  return passwordsMatch
}