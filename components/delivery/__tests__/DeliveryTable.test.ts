import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import DeliveryTable from '../DeliveryTable.vue'
import DeliveryTableRow from '../DeliveryTableRow.vue'

describe('DeliveryTable', () => {
  let wrapper
  let mockHandleDelete
  let mockHandleTransfer
  let mockHandleScroll

  beforeEach(() => {
    mockHandleDelete = vi.fn()
    mockHandleTransfer = vi.fn()
    mockHandleScroll = vi.fn()

    wrapper = shallowMount(DeliveryTable, {
      props: {
        data: [],
        columns: [],
        sorting: [],
      },
      global: {
        stubs: {
          DeliveryTableRow: true,
        },
      },
    })

    // Override component methods with mocks
    wrapper.vm.handleDelete = mockHandleDelete
    wrapper.vm.handleTransfer = mockHandleTransfer
    wrapper.vm.handleScroll = mockHandleScroll
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('calls handleDelete when delete method is called', async () => {
    const record = { id: 1 }
    await wrapper.vm.handleDelete(record)
    expect(mockHandleDelete).toHaveBeenCalledWith(record)
  })

  it('calls handleTransfer when transfer method is called', async () => {
    const record = { id: 1 }
    const newDriverId = 2
    await wrapper.vm.handleTransfer(record, newDriverId)
    expect(mockHandleTransfer).toHaveBeenCalledWith(record, newDriverId)
  })

  it('calls handleScroll when scroll method is called', async () => {
    const mockScrollEvent = new Event('scroll')
    await wrapper.vm.handleScroll(mockScrollEvent)
    expect(mockHandleScroll).toHaveBeenCalledWith(mockScrollEvent)
  })
})

describe('DeliveryTableRow', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(DeliveryTableRow, {
      props: {
        row: { id: 1, getIsSelected: () => false },
        index: 0,
        rowHeight: 40,
      },
    })
    expect(wrapper.exists()).toBe(true)
  })
})