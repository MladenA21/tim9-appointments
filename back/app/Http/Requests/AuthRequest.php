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

        if($this->days && json_validate($this->days)) {
            $this->merge(['days' => json_decode($this->days)]);
        }

        if(is_null($this->days)) {
            return [
                'days' => 'required'
            ];
        }

        return [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed',
            'type' => 'required|in:organization,client',
            'time_from' => 'required_if:type,organization|numeric',
            'time_to' => 'required_if:type,organization|numeric',
            'days' => 'required_if:type,organization|array',
            'days.*' => 'string|in:Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
        ];
    }
}
