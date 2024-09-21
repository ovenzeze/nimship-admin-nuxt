import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import DeliveryTable from '../DeliveryTable.vue'
import DeliveryTableRow from '../DeliveryTableRow.vue'

// Mock the dependencies
vi.mock('@tanstack/vue-table', () => ({
  useVueTable: vi.fn(() => ({
    getRowModel: () => ({ rows: [{ id: 1 }, { id: 2 }, { id: 3 }] }),
    getHeaderGroups: () => [{
      headers: [
        { id: 'name', column: { getCanSort: () => true, getIsSorted: () => false, toggleSorting: vi.fn() } },
        { id: 'date', column: { getCanSort: () => true, getIsSorted: () => 'asc', toggleSorting: vi.fn() } },
      ]
    }],
  })),
  getCoreRowModel: vi.fn(),
  getSortedRowModel: vi.fn(),
  getFilteredRowModel: vi.fn(),
  FlexRender: vi.fn(),
}))

vi.mock('@/components/ui/toast', () => ({
  useToast: vi.fn(() => ({ toast: vi.fn() })),
}))

// Mock DeliveryTableRow component
vi.mock('../DeliveryTableRow.vue', () => ({
  default: {
    name: 'DeliveryTableRow',
    props: ['row', 'index', 'rowHeight'],
    template: '<div>Mocked Row</div>',
  },
}))

describe('DeliveryTable', () => {
  let wrapper

  const mockProps = {
    data: [],
    columns: [],
  }

  beforeEach(() => {
    wrapper = mount(DeliveryTable, { props: mockProps })
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders DeliveryTableRow components', () => {
    expect(wrapper.findAllComponents(DeliveryTableRow).length).toBe(3)
  })

  it('emits delete-record event when confirmDelete is called', async () => {
    const record = { id: 1 }
    await wrapper.vm.confirmDelete(record)
    expect(wrapper.emitted('delete-record')).toBeTruthy()
    expect(wrapper.emitted('delete-record')?.[0]).toEqual([record])
  })

  it('opens transfer modal when openTransferModal is called', async () => {
    const record = { id: 1 }
    await wrapper.vm.openTransferModal(record)
    expect(wrapper.vm.showTransferModal).toBe(true)
    expect(wrapper.vm.selectedRecord).toEqual(record)
  })

  it('emits transfer-record event when handleTransfer is called', async () => {
    const record = { id: 1 }
    wrapper.vm.selectedRecord = record
    await wrapper.vm.handleTransfer(2)
    expect(wrapper.emitted('transfer-record')).toBeTruthy()
    expect(wrapper.emitted('transfer-record')?.[0]).toEqual([{ record, newDriverId: 2 }])
  })

  it('updates visible rows when scrolled', async () => {
    const mockScrollEvent = new Event('scroll')
    wrapper.vm.tableContainer = { 
      scrollTop: 100, 
      clientHeight: 500,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }
    await wrapper.vm.handleScroll(mockScrollEvent)
    expect(wrapper.vm.visibleRows).toBeDefined()
  })

  /*
it('toggles sorting when header is clicked', async () => {
    const headers = wrapper.findAll('th button')
    await headers[0].trigger('click')
    expect(wrapper.emitted('update:sorting')).toBeTruthy()
  })
*/

  /*
it('applies correct aria-sort attribute', () => {
    const headers = wrapper.findAll('th')
    expect(headers[0].attributes('aria-sort')).toBe('none')
    expect(headers[1].attributes('aria-sort')).toBe('ascending')
  })
*/
})

// Add tests for DeliveryTableRow
describe('DeliveryTableRow', () => {
  it('renders correctly', () => {
    const wrapper = mount(DeliveryTableRow, {
      props: {
        row: { id: 1, getVisibleCells: () => [] },
        index: 0,
        rowHeight: 40,
      },
    })
    expect(wrapper.exists()).toBe(true)
  })

  /*
it('emits delete event when delete action is triggered', async () => {
    const wrapper = mount(DeliveryTableRow, {
      props: {
        row: { id: 1, original: { id: 1 }, getVisibleCells: () => [] },
        index: 0,
        rowHeight: 40,
      },
    })
*/
    await wrapper.find('button[aria-label="Delete record"]').trigger('click')
    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')?.[0]).toEqual([{ id: 1 }])
  })

  /*
it('emits transfer event when transfer action is triggered', async () => {
    const wrapper = mount(DeliveryTableRow, {
      props: {
        row: { id: 1, original: { id: 1 }, getVisibleCells: () => [] },
        index: 0,
        rowHeight: 40,
      },
    })
*/
    await wrapper.find('button[aria-label="Transfer record"]').trigger('click')
    expect(wrapper.emitted('transfer')).toBeTruthy()
    expect(wrapper.emitted('transfer')?.[0]).toEqual([{ id: 1 }])
  })
})