<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'username' => 'required|unique:users',
            'password' => 'required|min:6',
            'c_password' => 'required|same:password',
        ];
    }
    public function attributes(): array
    {
        return [
            'name' => 'nama',
            'email' => 'email',
            'username' => 'username',
            'password' => 'password',
            'c_password' => 'konfirmasi password',

        ];
    }
    public function messages(): array
    {
        return [
            'required' => 'Kolom :attribute harus diisi.',
            'unique' => 'Kolom :attribute sudah terdaftar.',
            'same' => 'Kolom :attribute harus sama dengan password.',
            'min' => 'Kolom :attribute minimal :min karakter.',
        ];
    }
}
