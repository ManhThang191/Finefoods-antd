import {
  useTranslate,
  type HttpError,
  getDefaultFilter,
  useExport,
  useGo,
  useNavigation,
} from '@refinedev/core';
import {
  useTable,
  DateField,
  FilterDropdown,
  getDefaultSortOrder,
  ExportButton,
} from '@refinedev/antd';
import { Table, Avatar, Typography, Input, Select, Button, Flex } from 'antd';

import type { IUser } from '../../interfaces';
import { EyeOutlined } from '@ant-design/icons';
import { PaginationTotal, UserStatus } from '../../components';
import type { PropsWithChildren } from 'react';
import { useLocation } from 'react-router';

export const CustomerList = ({ children }: PropsWithChildren) => {
  const go = useGo();
  const { pathname } = useLocation();
  const { showUrl } = useNavigation();
  const t = useTranslate();

  const { tableProps, filters, sorters, setFilters } = useTable<
    IUser,
    HttpError,
    { fullName_like: string }
  >({
    filters: {
      initial: [
        {
          field: 'fullName',
          operator: 'contains',
          value: '',
        },
      ],
    },
    sorters: {
      initial: [
        {
          field: 'id',
          order: 'desc',
        },
      ],
    },
    syncWithLocation: true,
  });

  const { isLoading, triggerExport } = useExport<IUser>({
    sorters,
    filters,
    pageSize: 50,
    maxItemCount: 50,
    mapData: (item) => {
      return {
        id: item.id,
        fullName: item.fullName,
        gsm: item.gsm,
        isActive: item.isActive,
        createdAt: item.createdAt,
      };
    },
  });

  return (
    <div>
      <Flex justify="space-between">
        <div
          // className="search-input"
          style={{
            marginBottom: '10px',
          }}
        >
          <Input.Search
            defaultValue={getDefaultFilter('fullName', filters, 'contains')}
            onSearch={(value) => {
              setFilters([
                {
                  field: 'fullName',
                  operator: 'contains',
                  value: value,
                },
              ]);
            }}
          />
        </div>
        <ExportButton onClick={triggerExport} loading={isLoading} />
      </Flex>
      <Table
        {...tableProps}
        rowKey="id"
        scroll={{ x: true }}
        pagination={{
          ...tableProps.pagination,
          showTotal: (total) => (
            <PaginationTotal total={total} entityName="users" />
          ),
        }}
      >
        <Table.Column
          key="id"
          dataIndex="id"
          title="ID #"
          render={(value) => (
            <Typography.Text
              style={{
                whiteSpace: 'nowrap',
              }}
            >
              #{value}
            </Typography.Text>
          )}
        />
        <Table.Column
          align="center"
          key="avatar"
          dataIndex={['avatar']}
          title={t('users.fields.avatar.label')}
          render={(value) => <Avatar src={value[0].url} />}
        />
        <Table.Column
          key="fullName"
          dataIndex="fullName"
          title={t('users.fields.name')}
          defaultFilteredValue={getDefaultFilter(
            'fullName',
            filters,
            'contains'
          )}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input
                style={{ width: '100%' }}
                placeholder={t('users.filter.name.placeholder')}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="gsm"
          dataIndex="gsm"
          title={t('users.fields.gsm')}
          defaultFilteredValue={getDefaultFilter('gsm', filters, 'eq')}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input
                style={{ width: '100%' }}
                placeholder={t('users.filter.gsm.placeholder')}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="createdAt"
          dataIndex="createdAt"
          title={t('users.fields.createdAt')}
          render={(value) => <DateField value={value} format="LLL" />}
          sorter
        />
        <Table.Column
          key="isActive"
          dataIndex="isActive"
          title={t('users.fields.isActive.label')}
          render={(value) => {
            return <UserStatus value={value} />;
          }}
          sorter
          defaultSortOrder={getDefaultSortOrder('isActive', sorters)}
          defaultFilteredValue={getDefaultFilter('isActive', filters, 'eq')}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ width: '100%' }}
                placeholder={t('users.filter.isActive.placeholder')}
              >
                <Select.Option value="true">
                  {t('users.fields.isActive.true')}
                </Select.Option>
                <Select.Option value="false">
                  {t('users.fields.isActive.false')}
                </Select.Option>
              </Select>
            </FilterDropdown>
          )}
        />
        <Table.Column<IUser>
          fixed="right"
          title={t('table.actions')}
          render={(_, record) => (
            <Button
              icon={<EyeOutlined />}
              onClick={() => {
                return go({
                  to: `${showUrl('users', record.id)}`,
                  query: {
                    to: pathname,
                  },
                  options: {
                    keepQuery: true,
                  },
                  type: 'replace',
                });
              }}
            />
          )}
        />
      </Table>
      {children}
    </div>
  );
};
