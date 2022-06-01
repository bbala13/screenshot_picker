module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/directory',
                permanent: true,
            },
        ];
    },
    images: {
        domains: ['localhost:3000'],
    },
};
