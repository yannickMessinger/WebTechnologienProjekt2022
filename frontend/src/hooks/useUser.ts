import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr'

const fetcher = (url: string) =>
  fetch(url, {credentials: 'include'})
    .then((r) => r.json())
    .then((data) => {
      return { user: data?.user || null }
    })

export function useUser({ redirectTo, redirectIfFound } = {redirectTo: '/login', redirectIfFound: true}) {
  const navigate = useNavigate();
  const { data, error } = useSWR('http://localhost:4000/quiz/user', fetcher)
  const user = data?.user
  const finished = Boolean(data)
  const hasUser = Boolean(user)

  useEffect(() => {
    if (!redirectTo || !finished) return
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      navigate(redirectTo);
    }
  }, [redirectTo, redirectIfFound, finished, hasUser])

  return error ? null : user
}

export function useUsername({ redirectTo, redirectIfFound } = {redirectTo: '/login', redirectIfFound: true}) {
  const { data, error } = useSWR('http://localhost:4000/quiz/user', fetcher)
  const user = data?.user
  const finished = Boolean(data)
  const hasUser = Boolean(user)

  return error ? null : user
}