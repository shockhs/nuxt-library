export default function ({ store, redirect }) {
    if (!store.getters['authentication/status']) {
        redirect('/login?message=login')
    }
}