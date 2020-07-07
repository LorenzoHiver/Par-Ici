import React, { memo, Suspense, lazy } from 'react';

const Index = lazy(() => import('../Pages/index.page'));


const App = () => {
    return (
        <Suspense fallback={<h1>chargement</h1>}>
            <Index />
        </Suspense>

    )
}

export default memo(App);
