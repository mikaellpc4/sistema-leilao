import { useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import { IconType } from 'react-icons/lib'

type Input = {
  name: string,
  displayName: string,
  Icon: IconType,
  [x: string]: any
}

const Input = ({ name, displayName, Icon, ...rest }: Input) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })

  }, [fieldName, registerField])

  return (
    <div className='relative'>
      <input ref={inputRef} {...rest} placeholder={displayName} className="w-[100%] pl-14 h-14 rounded-lg" />
      <Icon size={30} className='absolute top-3 left-3 text-gray-300' />
      {error && <span className='text-red-300 font-bold text-md ml-2'>{error}</span>}
    </div>
  )
}

export default Input
