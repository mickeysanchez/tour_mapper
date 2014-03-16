exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost:8000',
  specs: ['integration_spec.js'],
  capabilities: {
    'browserName': 'chrome'
  },
}