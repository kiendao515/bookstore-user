import FormButton from "../../../../ui/FormButton";
import TextBox from "../../../../ui/TextBox";

const FindBookForm = (props: IFindBookFormProps) => {
    const { title } = props;
    return (
        <div>
            <div>
                <div className="pb-[14px] border-b-[1px] border-black" >
                    <text>[{title}]</text>
                </div>
                <div className="mt-4">
                    <div className="mb-4">
                        <TextBox placeholder="nhap ten sach" />
                    </div>
                    <div className="mb-4">
                        <TextBox placeholder="nhap ten tac gia" />

                    </div>
                    <div className="w-[82px] h-[45px]">
                        <FormButton label="tim" />
                    </div>
                </div>


            </div>
        </div>
    )
};

export default FindBookForm;