import { useParams, useRouteMatch } from "react-router-dom"
import { useAllModels, useExplore } from "./fetchers"

export function internalExploreURL({
  model,
  explore
}: {
  model: string
  explore: string
}) {
  return `/models/${encodeURIComponent(model)}/explores/${encodeURIComponent(
    explore
  )}`
}

export function relationshipsURL({ model }: { model: string }) {
  return `/models/${encodeURIComponent(model)}/relationships`
}

export function internalModelURL({ model }: { model: string }) {
  return `/models/${encodeURIComponent(model)}`
}

export function useCurrentModel() {
  const { modelName } = usePathNames()
  const models = useAllModels()
  if (!modelName) {
    return (
      models &&
      models.filter(m => m.explores && m.explores.some(e => !e.hidden))[0]
    )
  }
  return models && models.find(m => m.name == modelName)
}

export function usePathNames(): {
  modelName?: string
  exploreName?: string
  isRelationships: boolean
} {
  const match =
    useRouteMatch<{ model: string }>({
      path: "/models/:model",
      sensitive: true
    }) || undefined

  const match2 =
    useRouteMatch<{ model: string; explore: string }>({
      path: "/models/:model/explores/:explore",
      sensitive: true
    }) || undefined

  const relMatch = useRouteMatch({
    path: "/models/:model/relationships",
    sensitive: true
  })

  return {
    modelName: match && match.params.model,
    exploreName: match2 && match2.params.explore,
    isRelationships: !!relMatch
  }
}

export function useCurrentExplore() {
  const { modelName, exploreName } = usePathNames()
  return useExplore(modelName, exploreName)
}