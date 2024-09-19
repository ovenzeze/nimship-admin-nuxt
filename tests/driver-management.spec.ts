import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import DriverManagement from '@/pages/driver.vue'

describe('Driver Management', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(DriverManagement, {
      global: {
        plugins: [createTestingPinia()],
        stubs: ['NuxtLink', 'DataTable', 'Dialog', 'Dropdown']
      }
    })
  })

  test('renders driver management page', () => {
    expect(wrapper.find('h1').text()).toBe('Driver Management')
  })

  test('displays driver list', async () => {
    await wrapper.vm.fetchRecords()
    expect(wrapper.find('DataTable').exists()).toBe(true)
  })

  test('opens new driver dialog', async () => {
    await wrapper.find('button[data-test="new-driver-button"]').trigger('click')
    expect(wrapper.vm.showDriverDialog).toBe(true)
  })

  test('edits driver field in dropdown', async () => {
    const mockDriver = {
      uid: '1',
      first_name: 'John',
      last_name: 'Doe',
      available: false
    }
    wrapper.vm.updateDriverField(mockDriver, 'available', true)
    expect(wrapper.vm.updateDriver).toHaveBeenCalledWith({ ...mockDriver, available: true })
  })

  test('opens mobile details modal on small screens', async () => {
    global.innerWidth = 500
    global.dispatchEvent(new Event('resize'))
    await wrapper.vm.()

    const mockDriver = {
      uid: '1',
      first_name: 'John',
      last_name: 'Doe'
    }
    wrapper.vm.selectDriver(mockDriver)
    expect(wrapper.vm.showMobileDetailsModal).toBe(true)
  })
})
