import { useMutation } from 'react-query';
import { Form, Button, Space, notification } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDistricts, useProvinces, useWards } from '@/api/order/queries';
import { createShipment } from '@/api/shipment';
import TextInput from '@/ui/FormInput/TextInput';
import SelectInput from '@/ui/FormInput/SelectInput';
import NarrowIcon from '@/icons/NarrowIcon';
import { phoneRegExp } from '@/utils/constant';
import { ICreateShippingAddressPopUp, IFormValue } from './interface';

const CreateShippingAddressPopUp = ({ setReload, setToggle }: ICreateShippingAddressPopUp) => {
    const [api, contextHolder] = notification.useNotification();

    const schema = yup.object().shape({
        full_name: yup.string().required('Vui lòng nhập thông tin').max(100),
        phone_number: yup
            .string()
            .matches(phoneRegExp, 'Số điện thoại không hợp lệ.')
            .required('Vui lòng nhập số điện thoại'),
        province_code: yup.string().required('Vui lòng chọn tỉnh/thành phố').max(100),
        district_code: yup.string().required('Vui lòng chọn quận/huyện').max(100),
        ward_code: yup.string().required('Vui lòng chọn xã/phường').max(100),
        street: yup.string().required('Vui lòng nhập số nhà, tên đường').max(100),
        default: yup.boolean().required('vui lòng chọn giá trị'),
    });

    const formMethods = useForm<IFormValue>({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {},
    });

    const { provinces } = useProvinces();
    const { districts } = useDistricts(formMethods.watch('province_code') || '');
    const { wards } = useWards(formMethods.watch('district_code') || '');

    const { mutate, isLoading } = useMutation(createShipment, {
        onSuccess: (data) => {
            if (data.result) {
                api.success({
                    message: 'Thêm mới địa chỉ thành công',
                });
                setReload((prev) => prev + 1);
                setToggle(false);
            } else {
                api.error({
                    message: 'Thêm mới địa chỉ thất bại',
                });
            }
        },
        onError: () => {
            api.error({
                message: 'Thêm mới địa chỉ thất bại',
            });
        },
    });

    const onSubmit = (values: IFormValue) => {
        mutate(values);
    };

    return (
        <div style={{ maxWidth: '900px', margin: 'auto' }}>
            {contextHolder}
            <Form
                layout="vertical"
                onFinish={formMethods.handleSubmit(onSubmit)}
                autoComplete="off"
            >
                <TextInput
                    name="full_name"
                    label="Họ tên"
                    placeholder="Tên khách hàng"
                    control={formMethods.control}
                    errors={formMethods.formState.errors.full_name}
                />

                <TextInput
                    name="phone_number"
                    label="Số điện thoại"
                    placeholder="Số điện thoại"
                    control={formMethods.control}
                    errors={formMethods.formState.errors.phone_number}
                />

                <SelectInput
                    name="province_code"
                    label="Tỉnh/Thành phố"
                    placeholder="Chọn tỉnh/thành phố"
                    control={formMethods.control}
                    options={(provinces?.data || []).map((province) => ({
                        value: province.code,
                        label: province.full_name,
                    }))}
                    errors={formMethods.formState.errors.province_code}
                />

                <SelectInput
                    name="district_code"
                    label="Quận/Huyện"
                    placeholder="Chọn quận/huyện"
                    control={formMethods.control}
                    options={(districts?.data || []).map((district) => ({
                        value: district.code,
                        label: district.full_name,
                    }))}
                    errors={formMethods.formState.errors.district_code}
                />

                <SelectInput
                    name="ward_code"
                    label="Xã/Phường"
                    placeholder="Chọn xã/phường"
                    control={formMethods.control}
                    options={(wards?.data || []).map((ward) => ({
                        value: ward.code,
                        label: ward.full_name,
                    }))}
                    errors={formMethods.formState.errors.ward_code}
                />

                <TextInput
                    name="street"
                    label="Số nhà, tên đường"
                    placeholder="Số nhà, tên đường"
                    control={formMethods.control}
                    errors={formMethods.formState.errors.street}
                />

                <Form.Item name="default" valuePropName="checked">
                    <Space>
                        <input
                            type="checkbox"
                            {...formMethods.register('default')}
                        />
                        <label>Địa chỉ mặc định</label>
                    </Space>
                </Form.Item>

                <Form.Item>
                    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                        <Button type="primary" htmlType="submit" loading={isLoading}>
                            <NarrowIcon /> Thêm mới
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateShippingAddressPopUp;
