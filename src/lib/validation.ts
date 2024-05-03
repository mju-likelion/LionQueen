import * as Yup from 'yup';

export const SignUpValidationSchema = Yup.object({
  email: Yup.string()
    .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, '이메일 형식에 맞지 않습니다.')
    .required('이메일을 입력해주세요.'),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/,
      '6~10자의 영문, 숫자를 조합해서 입력하세요.',
    )
    .min(6, '6글자 이상 10글자 이하로 입력해주세요.')
    .max(10, '6글자 이상 10글자 이하로 입력해주세요.')
    .required('비밀번호를 입력해주세요.'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], '비밀번호가 다릅니다.')
    .required('비밀번호를 한번 더 입력해주세요.'),
  phone: Yup.string()
    .matches(/^[0-9]{11}$/i, '번호는 01012345678형태로 입력해주세요')
    .required('휴대폰 번호를 입력해주세요'),
  nickname: Yup.string()
    .matches(/^[가-힣|a-z|A-Z|0-9]{1,6}$/, '영문, 한글, 숫자 6자 이내로 조합해주세요.')
    .min(1, '1글자 이상 6글자 이하로 입력해주세요')
    .max(6, '1글자 이상 6글자 이하로 입력해주세요')
    .required('닉네임을 입력해주세요.'),
  code: Yup.string().length(6, '코드의 길이가 다릅니다.').required('인증코드를 입력해주세요.'),
});

export const SignInValidationSchema = Yup.object({
  email: Yup.string()
    .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, undefined)
    .required('이메일을 입력해주세요.'),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/,
      '아이디 또는 비밀번호를 잘못 입력했습니다.입력하신 내용을 다시 확인해주세요.',
    )
    .min(6, '6글자 이상 10글자 이하로 입력해주세요.')
    .max(10, '6글자 이상 10글자 이하로 입력해주세요.')
    .required('비밀번호를 입력해주세요.'),
});

export const PasswordFindValidationSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
      '이름 또는 이메일을 잘못 입력했습니다.입력하신 내용을 다시 확인해주세요.',
    )
    .required('이메일을 입력해주세요.'),
  name: Yup.string()
    .matches(/^[가-힣]{2,4}$/, undefined)
    .required('이름을 입력해주세요.'),
});

export const PasswordChangeValidationSchema = Yup.object({
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/,
      '6~10자의 영문, 숫자를 조합해서 입력하세요.',
    )
    .min(6, '6글자 이상 10글자 이하로 입력해주세요.')
    .max(10, '6글자 이상 10글자 이하로 입력해주세요.')
    .required('비밀번호를 입력해주세요.'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호를 한번 더 입력해주세요.'),
});
