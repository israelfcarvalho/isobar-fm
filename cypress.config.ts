import { defineConfig } from 'cypress'
import webpackConfig from './config/webpackDevServer.config'

export default defineConfig({
    component: {
        devServer: {
            framework: 'create-react-app',
            bundler: 'webpack',
        },
    },
})
