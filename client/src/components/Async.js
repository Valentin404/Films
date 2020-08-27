import React, {Suspense, lazy} from "react"
import Spinner from "./Spinner"

export const Async = Component => props => (
    <Suspense fallback={<Spinner />}>
        <Component {...props} />
    </Suspense>
)

export const lazyImport = filename => lazy(() => import(`${filename}`))
