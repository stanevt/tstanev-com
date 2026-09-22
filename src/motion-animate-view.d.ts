declare module "motion" {
  type ViewTransitionValue = string | number | Array<string | number>
  type ViewTransitionKeyframes = Record<string, ViewTransitionValue>
  type ViewTransitionEasing = string | number[] | ((progress: number) => number)

  type ViewTransitionOptions = {
    delay?: number
    duration?: number
    ease?: ViewTransitionEasing
    interrupt?: "wait" | "immediate"
  }

  type ViewTransitionAnimation = {
    finished: Promise<unknown>
  }

  interface ViewTransitionBuilder extends PromiseLike<ViewTransitionAnimation> {
    crossfade(options?: ViewTransitionOptions): this
    enter(keyframes: ViewTransitionKeyframes, options?: ViewTransitionOptions): this
    exit(keyframes: ViewTransitionKeyframes, options?: ViewTransitionOptions): this
    get(subject: string): this
    layout(keyframes: ViewTransitionKeyframes, options?: ViewTransitionOptions): this
    "new"(keyframes: ViewTransitionKeyframes, options?: ViewTransitionOptions): this
    old(keyframes: ViewTransitionKeyframes, options?: ViewTransitionOptions): this
  }

  export function animateView(
    update: () => void | Promise<void>,
    defaultOptions?: ViewTransitionOptions,
  ): ViewTransitionBuilder
}
